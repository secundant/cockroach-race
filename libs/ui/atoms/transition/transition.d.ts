import { TransitionOptions } from '../../hooks/use-transition';
import { ReactElement } from 'react';

export interface TransitionProps extends TransitionOptions {
  children: ReactElement;
  type?: TransitionVariant;
}

export type TransitionVariant = 'grow' | 'fade';
