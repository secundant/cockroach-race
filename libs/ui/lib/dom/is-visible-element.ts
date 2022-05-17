export function isHiddenElement(element: HTMLElement) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return element.style.display === 'none';
}

export function isVisibleElement(element: HTMLElement) {
  let parentElement: HTMLElement = element;

  while (parentElement && parentElement !== document.body) {
    if (isHiddenElement(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode as HTMLElement;
  }

  return true;
}
