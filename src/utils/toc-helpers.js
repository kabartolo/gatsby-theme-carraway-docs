import { deepCopy, traverseTOC } from '@kabartolo/gatsby-theme-chicago-docs-core/utils/helpers';
import { removeFragment } from './path-helpers';

function addTOC(sidebarItems, allTableOfContents) {
  return sidebarItems.map((item) => {
    const newItem = deepCopy(item);
    if (newItem.isGroup) {
      newItem.items = addTOC(newItem.items, allTableOfContents);
    } else {
      const tocItems = allTableOfContents.find((toc) => toc.id === newItem.id);
      if (tocItems && tocItems.nested) {
        newItem.items = tocItems.nested.items;
      }
    }

    return newItem;
  });
}

function formatTOC(sidebarItems, depth, basePath = '') {
  const items = deepCopy(sidebarItems);
  let path = basePath;

  /* eslint-disable no-param-reassign */
  traverseTOC(
    items,
    depth,
    (item) => {
      if (item.path) path = removeFragment(item.path);

      if (item.items && !item.isGroup) {
        item.items = item.items.map((heading) => ({
          id: heading.url,
          name: heading.title,
          slug: heading.url,
          path: `${path}${heading.url}`,
          items: heading.items,
        }));
      }
    },
  );
  /* eslint-enable no-param-reassign */

  return items;
}

function markOpenAccordions(
  currentPath,
  sidebarItems,
) {
  const items = deepCopy(sidebarItems);
  const openItem = items.find((item) => {
    const pathRegExp = new RegExp(item.path);
    return pathRegExp.test(currentPath);
  });

  if (openItem) {
    openItem.isOpen = true;
    if (openItem.items) openItem.items = markOpenAccordions(currentPath, openItem.items);
  }

  return items;
}

export {
  addTOC,
  deepCopy,
  formatTOC,
  markOpenAccordions,
};
