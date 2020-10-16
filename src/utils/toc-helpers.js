import { deepCopy, traverseTOC } from 'gatsby-theme-carraway-docs-core/utils/helpers';

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
      if (item.path) path = item.path.replace(/#.+/, '');

      if (item.items && !item.isGroup) {
        item.items = item.items.map((heading) => ({
          id: heading.url,
          name: heading.title,
          type: heading.url,
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
  currentpath,
  depth,
  sidebarItems,
) {
  const items = deepCopy(sidebarItems);

  function checkIfOpen(item, path) {
    const hasOpenChild = item.items && item.items.find((subItem) => (
      subItem.path === path || checkIfOpen(subItem, path)
    ));

    return item.path === path || hasOpenChild;
  }

  /* eslint-disable no-param-reassign */
  traverseTOC(
    items,
    depth,
    (item) => {
      item.isOpen = checkIfOpen(item, currentpath);
    },
  );
  /* eslint-enable no-param-reassign */

  return items;
}

export {
  addTOC,
  deepCopy,
  formatTOC,
  markOpenAccordions,
};
