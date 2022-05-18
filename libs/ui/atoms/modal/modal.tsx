import {
  useEventCallback,
  useFocusReturn,
  useFocusTrap,
  useForkChildrenRef,
  useMergeCallback,
  useScrollLock
} from '../../hooks';
import type { ModalProps } from './modal.d';
import clsx from 'clsx';
import React, { cloneElement, ForwardedRef, forwardRef, useState } from 'react';

export const Modal = forwardRef(
  (
    { children, className, transition, onClose, open, OverlayComponent }: ModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [exited, setExited] = useState(true);
    const visible = transition ? !exited : !!open;

    const trapRef = useFocusTrap(visible);
    const childrenRef = useForkChildrenRef(children, trapRef);

    useScrollLock(visible);
    useFocusReturn({
      active: open
    });

    const handleKeyDown = useEventCallback(({ key }: React.KeyboardEvent) => {
      if (open && key === 'Escape') onClose?.();
    });
    const handleOverlayClick = useEventCallback((event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose?.();
    });
    const handleEnter = useMergeCallback(
      useEventCallback(() => setExited(false)),
      transition ? children.props.onEnter : void 0
    );
    const handleExited = useMergeCallback(
      useEventCallback(() => setExited(true)),
      transition ? children.props.onExited : void 0
    );

    if (!open && (!transition || exited)) {
      return null;
    }
    return (
      <div
        ref={ref}
        role="presentation"
        onKeyDown={handleKeyDown}
        className={clsx('overlay z-50', !visible && 'invisible opacity-0', className)}
        aria-hidden={!visible}
      >
        <OverlayComponent open={open} onClick={handleOverlayClick} />
        {cloneElement(children, {
          ref: childrenRef,
          tabIndex: children.props.tabIndex ?? '-1',
          ...(transition ? { onEnter: handleEnter, onExited: handleExited } : {})
        })}
      </div>
    );
  }
);
