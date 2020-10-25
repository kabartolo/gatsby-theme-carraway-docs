import { traverseTOC } from '@kabartolo/gatsby-theme-chicago-docs-core/utils/helpers';

export default function getIds(items, depth) {
  if (!items) return [];

  const list = [];
  traverseTOC(
    items,
    depth,
    (item) => { if (item.url) list.push(item.url.slice(1)); },
  );

  return list;
}
