import { isVisibleElement } from './is-visible-element';

export function isTabbableElement(element: HTMLElement) {
  if ((element as HTMLInputElement).disabled || !isVisibleElement(element)) return false;

  if (isInput(element)) {
    if (element.type === 'hidden') return false;
    if (isNamedRadio(element)) return isTappableRadio(element);
    return true;
  }
  return true;
}

const isInput = (el: Element): el is HTMLInputElement => el.tagName === 'INPUT';
const isNamedRadio = (el: HTMLInputElement) => el.type === 'radio' && Boolean(el.name);

const isTappableRadio = (node: HTMLInputElement) => {
  const roving =
    getRadioSelector(node, `[name="${node.name}"]:checked`) ||
    getRadioSelector(node, `[name="${node.name}"]`);

  return roving === node;
};

const getRadioSelector = (element: HTMLElement, selector: string) =>
  element.ownerDocument.querySelector(`input[type="radio"] ${selector}`);
