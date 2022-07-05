export function mapObjectToEntries<T extends Record<any, any>, Value>(
  target: T,
  fn: <K extends keyof T>(name: Extract<K, string>, value: T[K]) => Value
): Array<[Extract<keyof T, string>, Value]> {
  return Object.entries(target).map(([name, value]) => [
    name.toString() as Extract<keyof T, string>,
    fn(name, value)
  ]);
}
