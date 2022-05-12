import { SharedHtmlAtomProps } from '../../types';
import { ReactNode } from 'react';

export interface FieldLayoutProps extends SharedHtmlAtomProps {
  label: ReactNode;
  htmlFor?: string;
  invalid?: boolean;
  required?: boolean;
  description?: ReactNode;
  children: NonNullable<ReactNode>;
}
