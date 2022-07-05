export const uniq = <T>(values: T[]) =>
  values.reduce((acc, value) => {
    if (!acc.includes(value)) acc.push(value);
    return acc;
  }, [] as T[]);
