import { AriaRole, CSSProperties } from 'react';

export interface SharedTestProps {
  testId?: string;
}

export interface SharedHtmlElementProps {
  id?: string;
  role?: AriaRole;
  style?: CSSProperties;
  className?: string;
}

export interface SharedHtmlAtomProps extends SharedHtmlElementProps, SharedTestProps {}
