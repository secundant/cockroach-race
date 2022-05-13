import { useForkChildrenRef } from '../../hooks';
import useTransition from '../../hooks/use-transition';
import type { TransitionProps } from './transition.d';
import clsx from 'clsx';
import { cloneElement, ForwardedRef, forwardRef } from 'react';

export const Transition = forwardRef(
  (
    {
      children,
      type,
      open,
      duration,
      exitDuration,

      onExit,
      onEnter,
      onExited,
      onEntered,
      onExiting,
      onEntering,

      ...rest
    }: TransitionProps,
    ref: ForwardedRef<any>
  ) => {
    const { status } = useTransition({
      open,
      duration,
      exitDuration,

      onExit,
      onEnter,
      onExited,
      onEntered,
      onExiting,
      onEntering
    });

    return cloneElement(children, {
      className: clsx(
        (children.props as any).className,
        'transition-base',
        (rest as any).className
      ),
      'data-transition-type': type,
      'data-transition-status': status,
      ref: useForkChildrenRef(children, ref),
      ...(rest as any)
    });
  }
);
