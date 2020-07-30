import { graphql, useStaticQuery } from 'gatsby';

export default function useBreadcrumb(menus, post) {
  const { allPost } = useStaticQuery(graphql`
    query {
      allPost {
        group(field: group) {
          fieldValue
          nodes {
            postType
            slug
          }
        }
      }
    }
  `);
  if (post == null) return {};
  const { postType, currentGroup, postPath } = post;

  const postTypeMenu = menus.find((menu) => menu.type === postType);
  if (!postTypeMenu) return {};

  const postData = (menu) => {
    if (!menu) return null;

    return ({
      path: `/${menu.type}/`,
      name: menu.name,
    });
  };

  const groupData = (typePath, name) => {
    if (!currentGroup) return null;

    const data = allPost.group.find((mdxGroup) => mdxGroup.fieldValue === currentGroup);

    if (!data) return null;

    const groupHasIndex = data.nodes.find((node) => (
      node.fields.postType === postType && node.fields.slug === 'index'
    ));
    console.log(groupHasIndex);

    return ({
      path: groupHasIndex ? `${typePath}${data.fieldValue}/` : '',
      name,
    });
  };

  const postBreadcrumb = postData(postTypeMenu);

  const postTypePath = postBreadcrumb ? postBreadcrumb.path : '/';
  const group = postTypeMenu.items.find((item) => item.folder === currentGroup);
  const groupBreadcrumb = groupData(postTypePath, group && group.name);

  const postIsIndex = (!!postBreadcrumb && postPath === postBreadcrumb.path)
    || (!!groupBreadcrumb && postPath === groupBreadcrumb.path);

  return ({
    post: postBreadcrumb,
    group: groupBreadcrumb,
    postIsIndex,
  });
}
