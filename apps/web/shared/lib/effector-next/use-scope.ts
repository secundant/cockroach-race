import { fork, Scope, serialize } from 'effector';
import { useMemo } from 'react';

export interface UseScopeParams<T extends Record<string, unknown>> {
  initialState: T;
}

export function useScope<T extends Record<string, unknown>>({
  initialState
}: UseScopeParams<T>): Scope {
  return useMemo(() => createScope(initialState), [initialState]);
}

let currentClientScope: Scope;

function createScope<T extends Record<string, unknown>>(initialData: T) {
  const scope = fork({
    values: {
      ...(currentClientScope ? serialize(currentClientScope) : {}),
      ...initialData
    }
  });

  // For SSG and SSR always create a new currentClientScope
  if (typeof window === 'undefined') return scope;
  // Create the currentClientScope once in the client
  currentClientScope = scope;

  return scope;
}
