import Modal from '../../atoms/modal';
import OverlayBlur, { OverlayBlurProps } from '../../atoms/overlay-blur';
import Paper from '../../atoms/paper';
import Portal from '../../atoms/portal';
import Transition from '../../atoms/transition';
import type { DialogProps } from './dialog.d';
import clsx from 'clsx';
import { FC, ForwardedRef, forwardRef } from 'react';

export const Dialog = forwardRef(
  (
    { children, className, open, onClose, ...props }: DialogProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Portal>
        <Modal open={open} onClose={onClose} transition OverlayComponent={Overlay}>
          <Transition type="fade" open={open}>
            <Paper
              ref={ref}
              role="dialog"
              className={clsx(
                'absolute-center max-h-[calc(100%-32px)] overflow-y-auto outline-none p-5',
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

const Overlay: FC<OverlayBlurProps> = props => (
  <Transition type="fade" open={props.open}>
    <OverlayBlur {...props} open />
  </Transition>
);
