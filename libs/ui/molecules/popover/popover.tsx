import Modal from '../../atoms/modal';
import OverlayInvisible from '../../atoms/overlay-invisible';
import Paper from '../../atoms/paper';
import Portal from '../../atoms/portal';
import Transition from '../../atoms/transition';
import { useForkRef } from '../../hooks';
import { debounce } from '../../lib/debounce';
import { adjustPosition, getPopoverRectOffset, getTransformOriginStyleByRect } from './lib';
import type { PopoverElementPosition, PopoverOrigin, PopoverProps, PopoverRect } from './popover.d';
import clsx from 'clsx';
import { ForwardedRef, forwardRef, useCallback, useEffect, useRef } from 'react';

export const Popover = forwardRef(
  (
    {
      testId,
      children,
      marginThreshold = defaultMarginThreshold,
      transformOrigin = defaultTransformOrigin,
      anchorOrigin = defaultAnchorOrigin,
      onClose,
      id,
      open = false,
      className,
      anchorNode,
      ...props
    }: PopoverProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const paperRef = useRef<HTMLDivElement>(null);
    const paperForkRef = useForkRef(paperRef, ref);

    const getAnchorOffset = useCallback(() => {
      if (!anchorNode) return null;
      const rect = anchorNode.getBoundingClientRect();
      const offset = getPopoverRectOffset(rect, anchorOrigin);

      return {
        top: rect.top + offset.top,
        left: rect.left + offset.left
      };
    }, [anchorNode, anchorOrigin.vertical, anchorOrigin.horizontal]);

    const getTransformOffset = useCallback(
      (rect: PopoverRect) => getPopoverRectOffset(rect, transformOrigin),
      [transformOrigin.vertical, transformOrigin.horizontal]
    );

    const getPositionStyle = useCallback(
      (element: HTMLElement) => {
        if (!anchorNode) return null;
        const rect: PopoverRect = {
          width: element.offsetWidth,
          height: element.offsetHeight
        };
        const anchorOffset = getAnchorOffset()!;
        const transformOffset = getTransformOffset(rect);

        const position = {
          top: anchorOffset.top - transformOffset.top,
          left: anchorOffset.left - transformOffset.left
        } as PopoverElementPosition;

        position.right = position.left + rect.width;
        position.bottom = position.top + rect.height;

        // Window thresholds taking required margin into account
        const { innerWidth, innerHeight } = window;

        adjustPosition(
          transformOffset,
          position,
          {
            width: innerWidth,
            height: innerHeight
          },
          marginThreshold
        );

        return {
          top: `${Math.round(position.top)}px`,
          left: `${Math.round(position.left)}px`,
          transformOrigin: getTransformOriginStyleByRect(transformOffset)
        };
      },
      [anchorNode, getAnchorOffset, getTransformOffset, marginThreshold]
    );

    const syncElementStyles = useCallback(() => {
      const element = paperRef.current as any as HTMLElement;
      const position = element && getPositionStyle(element);

      if (!element || !position) return;
      Object.assign(element.style, position);
    }, [getPositionStyle]);

    useEffect(() => {
      if (open) {
        syncElementStyles();
      }
    });
    useEffect(() => {
      if (!open || !anchorNode) return;
      const handleResize = debounce(syncElementStyles);

      window.addEventListener('resize', handleResize);
      return () => {
        handleResize.clear();
        window.removeEventListener('resize', handleResize);
      };
    }, [anchorNode, open, syncElementStyles]);

    return (
      <Portal>
        <Modal open={open} transition OverlayComponent={OverlayInvisible} onClose={onClose}>
          <Transition type="grow" open={open} onEntering={syncElementStyles}>
            <Paper
              id={id}
              ref={paperForkRef}
              className={clsx(
                'overflow-x-hidden shadow-el-lg overflow-y-auto absolute outline-none bg-white/95 backdrop-blur-sm',
                'min-w-[16px] min-h-[16px] max-w-[calc(100%-32px)] max-h-[calc(100%-32px)] rounded-lg',
                className
              )}
              {...props}
            >
              {children}
            </Paper>
          </Transition>
        </Modal>
      </Portal>
    );
  }
);

const defaultMarginThreshold = 16;
const defaultAnchorOrigin: PopoverOrigin = {
  vertical: 'end',
  horizontal: 'center'
};
const defaultTransformOrigin: PopoverOrigin = {
  vertical: 'start',
  horizontal: 'center'
};
