import { isString } from '../../shared/core-utils';

export const renderEnumValue = (value: string | number) => (isString(value) ? `"${value}"` : value);
