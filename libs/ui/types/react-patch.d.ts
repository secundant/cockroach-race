import React from 'react';

/**
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087#issuecomment-726158907
 */

declare module 'react' {
  function memo<T extends React.ComponentType<any>>(
    c: T,
    areEqual?: (
      prev: Readonly<React.ComponentProps<T>>,
      next: Readonly<React.ComponentProps<T>>
    ) => boolean
  ): T & {
    displayName?: string | undefined;
  };

  // function forwardRef<T extends React.ForwardRefRenderFunction<any>>(
  //   c: T
  // ): React.ForwardRefExoticComponent<
  //   React.PropsWithoutRef<PropsOfForwardRef<T>> & React.RefAttributes<T>
  // >;
  //
  // type PropsOfForwardRef<T extends React.ForwardRefRenderFunction<any>> =
  //   T extends React.ForwardRefRenderFunction<infer P> ? P : never;
  //
  // type RefOfForwardRef<T extends React.ForwardRefRenderFunction<any>> =
  //   T extends React.ForwardRefRenderFunction<any, infer P> ? P : never;

  interface CSSProperties extends React.CSSProperties {
    [key: `--${string}`]: string | number | null | void;
  }
}
