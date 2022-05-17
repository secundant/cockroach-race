export const isFocusableElement = (element: Element | EventTarget | null): element is HTMLElement =>
  element !== null && 'focus' in element && typeof (element as HTMLElement).focus === 'function';
