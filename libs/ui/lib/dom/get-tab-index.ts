export function getElementTabIndex(element: Element) {
  const tabIndexAttrValue = element.getAttribute('tabindex');
  const tabIndexAsNumber = parseInt(tabIndexAttrValue!, 10);

  if (!Number.isNaN(tabIndexAsNumber)) return tabIndexAsNumber;

  // Browsers do not return `tabIndex` correctly for contentEditable nodes;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=661108&q=contenteditable%20tabindex&can=2
  // so if they don't have a tabindex attribute specifically set, assume it's 0.
  // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
  //  `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
  //  yet they are still part of the regular tab order; in FF, they get a default
  //  `tabIndex` of 0; since Chrome still puts those elements in the regular tab
  //  order, consider their tab index to be 0.
  if (
    (element as HTMLElement).contentEditable === 'true' ||
    (NODES_WITH_HIDDEN_TABINDEX.includes(element.nodeName) && tabIndexAttrValue === null)
  ) {
    return 0;
  }

  return (element as HTMLElement).tabIndex;
}

const NODES_WITH_HIDDEN_TABINDEX = ['AUDIO', 'VIDEO', 'DETAILS'];
