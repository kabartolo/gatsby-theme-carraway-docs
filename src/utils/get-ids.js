export default function getIds(tableOfContents, depth, currentDepth = 2) {
  if (!tableOfContents) return [];

  return tableOfContents.reduce((list, item) => {
    if (item.url) {
      list.push(item.url.slice(1)); // remove starting '#'
    }
    if (item.items && currentDepth < depth) {
      list.push(...getIds(item.items, depth, currentDepth + 1));
    }
    return list;
  }, []);
}
