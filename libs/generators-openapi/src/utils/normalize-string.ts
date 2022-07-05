export const normalizeBy = (fn: (part: string, index: number) => string) => (value: string) =>
  value
    .split(STRING_SEPARATOR)
    .map(part => part.trim())
    .filter(Boolean)
    .map(fn)
    .join('');

export const normalizePascalCase = normalizeBy(
  part => `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}`
);

export const STRING_SEPARATOR = /\s|'|"|\.|`|[|]|_|-/;
