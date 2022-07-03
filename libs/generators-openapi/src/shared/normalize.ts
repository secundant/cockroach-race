export const normalizeName = (value: string) =>
  value.split(SCHEMA_NAME_SEPARATOR).filter(Boolean).map(capitalizeFirstChar).join('');

const capitalizeFirstChar = (value: string) => `${value[0].toUpperCase()}${value.substring(1)}`;
const SCHEMA_NAME_SEPARATOR = /\.|`|[|]|_|-/;
