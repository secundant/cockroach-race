import { AriaRole } from 'react';

export interface SharedTestProps {
  testId?: string;
}

export interface SharedHtmlElementProps {
  id?: string;
  role?: AriaRole;
  className?: string;
}

export interface SharedHtmlAtomProps extends SharedHtmlElementProps, SharedTestProps {}
