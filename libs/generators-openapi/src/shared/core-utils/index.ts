export const uniq = <T>(values: T[]) =>
  values.reduce((acc, value) => {
    if (!acc.includes(value)) acc.push(value);
    return acc;
  }, [] as T[]);

export const groupBy = <T, Key extends keyof any>(
  values: T[],
  fn: (value: T) => Key
): Record<Key, T[]> => {
  const result = {} as Record<Key, T[]>;

  for (const value of values) {
    const key = fn(value);

    result[key] ??= [];
    result[key].push(value);
  }
  return result;
};

export const negate =
  <T extends any[]>(fn: (...args: T) => boolean): ((...args: T) => boolean) =>
  (...args: T) =>
    !fn(...args);

export const isNotEmptyObject = (value: Record<string, any>) => Object.values(value).some(Boolean);
export const isEmptyObject = negate(isNotEmptyObject);

export const isString = (value: unknown): value is string => typeof value === 'string';
