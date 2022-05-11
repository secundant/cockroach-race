export interface ISharedTestProps {
  testId?: string;
}

export interface ISharedHtmlElementProps {
  id?: string;
  className?: string;
}

export interface ISharedHtmlAtomProps extends ISharedHtmlElementProps, ISharedTestProps {}
