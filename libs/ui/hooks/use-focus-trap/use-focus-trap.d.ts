export type UseFocusTrapParams = boolean;

export interface UseFocusTrapResult {
  count: number;
  setCount(value: number): void;
  decrement(): void;
  increment(): void;
}
