/**
 * Shortcut for add/remove event (ex. in effects)
 */
export const subscribeToEvent = <K extends keyof HTMLElementEventMap, T extends EventTarget = any>(
  target: T,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) => {
  target.addEventListener(type, handler as any, options);
  return () => target.removeEventListener(type, handler as any, options);
};
