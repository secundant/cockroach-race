// A change of the browser zoom change the scrollbar size.
// Credit https://github.com/twbs/bootstrap/blob/488fd8afc535ca3a6ad4dc581f5e89217b6a36ac/js/src/util/scrollbar.js#L14-L18
// https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
export function getScrollWidth() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;

  const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  return paddingRight + scrollbarWidth;
}
