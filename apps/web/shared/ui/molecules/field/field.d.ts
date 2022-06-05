import { Translate } from 'next-translate';
import { ReactElement } from 'react';

export interface FieldProps {
  t: Translate;
  name: string;

  id?: string;
  defaultValue?: any;
  shouldUnregister?: boolean;

  required?: boolean;
  minLength?: number;

  children: ReactElement;
}
