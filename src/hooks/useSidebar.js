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
    }));
  };

  const itemData = (slug) => {
    const node = postTypeNodes.find((postNode) => postNode.fields.slug === slug);

    return ({
      id: node.id,
      name: node.frontmatter.name,
      path: node.fields.path,
      items: contentData(node.fields.path, node.tableOfContents),
      isOpen: node.id === postID,
    });
  };

  const getNodesByGroup = (groupName) => (
    postTypeNodes.filter((node) => node.fields.group === groupName)
  );

  const groupData = (groupItem) => {
    const { name, folder, items } = groupItem;
    const menu = items && items.length
      ? items.map((item) => itemData(item))
      : getNodesByGroup(folder).map((node) => itemData(node.fields.slug));

    return ({
      id: folder,
      name,
      path: null,
      items: menu,
      isOpen: folder === currentGroup,
    });
  };

  return ({
    posts: postTypeMenu.items.map((item) => (
      item.name ? groupData(item) : itemData(item)
    )),
  });
}
