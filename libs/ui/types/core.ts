import {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ElementType,
    JSXElementConstructor,
} from 'react';

export type TRefOf<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

export type THTMLElementType = keyof JSX.IntrinsicElements;

export type TPropsOf<C extends THTMLElementType | JSXElementConstructor<any>> =
    JSX.LibraryManagedAttributes<C, ComponentPropsWithoutRef<C>>;

export type TMergeProps<Base extends {}, Extended extends {}> = Base & Omit<Extended, keyof Base>;

export interface IPolymorphicTagProps<C extends ElementType> {
    as?: C;
}

export type TPolymorphicProps<C extends ElementType, Props = {}> = TMergeProps<
    Props & IPolymorphicTagProps<C>,
    TPropsOf<C>
>;
