import { getElementTabIndex } from './get-tab-index';
import { isTabbableElement } from './is-tabbable-element';

export function getTabbableDescendants(node: HTMLElement) {
  const elementsWithZeroTabIndex: Element[] = [];
  const elementsGroupedByTabIndex: Element[][] = [];

  Array.from<HTMLElement>(node.querySelectorAll(TABBABLE_SELECTOR)).forEach(element => {
    const nodeTabIndex = getElementTabIndex(element);

    if (nodeTabIndex < 0 || !isTabbableElement(element)) return;

    if (nodeTabIndex === 0) {
      elementsWithZeroTabIndex.push(element);
    } else if (elementsGroupedByTabIndex[nodeTabIndex]) {
      elementsGroupedByTabIndex[nodeTabIndex].push(element);
    } else {
      elementsGroupedByTabIndex[nodeTabIndex] = [element];
    }
  });

  return elementsGroupedByTabIndex.flat().concat(elementsWithZeroTabIndex);
}

// Inspired by https://github.com/focus-trap/tabbable
const TABBABLE_SELECTOR = [
  'input',
  'select',
  'textarea',
  'a[href]',
  'button',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');
