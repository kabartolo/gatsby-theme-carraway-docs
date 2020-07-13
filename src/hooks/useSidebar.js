import { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { PostContext } from '../components/Layout/post-context';

export default function useSidebar(menus) {
  const { postType, currentGroup, postID } = useContext(PostContext);

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: fields___postType) {
          fieldValue
          nodes {
            id
            fields {
              group
              postType
              path
              slug
            }
            frontmatter {
              name
              title
            }
            tableOfContents(maxDepth: 2)
          }
        }
      }
    }
  `);

  if (!menus) return null;

  const postTypeMenu = menus.find((menu) => menu.type === postType);

  if (!postTypeMenu) return null;

  const postTypeNodes = data.allMdx.group.find((group) => group.fieldValue === postType).nodes;

  const contentData = (path, contents) => {
    if (!contents.items) return null;

    return contents.items.map((heading) => ({
      id: heading.url,
      name: heading.title,
      path: path.replace(/\/$/, heading.url),
      items: null,
      isOpen: null,
      isGroup: false,
    }));
  };

  const groupHasIndex = (menu, path) => (
    menu.filter((item) => item.path === path).length > 0
  );

  const itemDataByNode = (node) => ({
    id: node.id,
    name: node.frontmatter.name,
    path: node.fields.path,
    items: contentData(node.fields.path, node.tableOfContents),
    isOpen: node.id === postID,
    isGroup: false,
  });

  const itemDataBySlug = (slug) => {
    const node = postTypeNodes.find((postNode) => postNode.fields.slug === slug);
    if (!node) return null;

    return itemDataByNode(node);
  };

  const getNodesByGroup = (groupName) => (
    postTypeNodes.filter((node) => node.fields.group === groupName)
  );

  const groupData = (groupItem) => {
    const { name, folder, items } = groupItem;
    const menu = items && items.length
      ? items.map((item) => itemDataBySlug(item)).filter((item) => item !== null)
      : getNodesByGroup(folder).map((node) => itemDataByNode(node));
    const path = `/${postType}/${folder}/`;

    return ({
      id: folder,
      name,
      path: groupHasIndex(menu, path) ? path : null,
      items: menu,
      isOpen: folder === currentGroup,
      isGroup: true,
    });
  };

  const items = postTypeMenu.items.map((item) => (
    item.name ? groupData(item) : itemDataBySlug(item)
  ));

  return ({
    items: items.filter((post) => post !== null),
  });
}
