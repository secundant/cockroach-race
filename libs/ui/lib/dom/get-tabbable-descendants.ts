import { getElementTabIndex } from './get-tab-index';
import { isTabbableElement } from './is-tabbable-element';

export function getTabbableDescendants(node: HTMLElement) {
  // First item will contain zero tabIndexed element
  const elementsByTabIndex = Array.from<HTMLElement>(
    node.querySelectorAll(TABBABLE_SELECTOR)
  ).reduce<Element[][]>((acc, element) => {
    const index = getElementTabIndex(element);

    if (index >= 0 && isTabbableElement(element)) {
      acc[index] = acc[index] || [];
      acc[index].push(element);
    }
    return acc;
  }, []);

  /**
   * Ordering flow:
   * [<button />, <button tabIndex="2" />, <button tabIndex="4" />, <button tabIndex="8" />] =>
   * [[<button />, void, [<button tabIndex="2" />], void, [<button tabIndex="4" />], void, void, void, [<button tabIndex="8" />]] =>
   * [<button tabIndex="2" />, <button tabIndex="4" />, <button tabIndex="8" />, <button /> ]
   */
  return elementsByTabIndex.slice(1).filter(Boolean).flat().concat(elementsByTabIndex[0]);
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
