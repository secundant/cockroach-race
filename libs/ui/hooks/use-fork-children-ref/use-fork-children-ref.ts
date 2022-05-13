import { Nil } from '../../types';
import useForkRef from '../use-fork-ref';
import { isValidElement, ReactNode, Ref } from 'react';

export function useForkChildrenRef<T>(children: ReactNode, ref: Ref<T> | Nil) {
  return useForkRef(getChildrenRef(children), ref);
}

export const getChildrenRef = <T = any>(children: ReactNode): Ref<T> | null =>
  isValidElement(children) ? (children as any).ref ?? null : null;
