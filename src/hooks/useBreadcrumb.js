import { graphql, useStaticQuery } from 'gatsby';

export default function useBreadcrumb(menus, postPath, postType, currentGroup) {
  const { allMdx } = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: fields___group) {
          fieldValue
          nodes {
            fields {
              postType
              slug
            }
          }
        }
      }
    }
  `);

  const postTypeMenu = menus.find((menu) => menu.type === postType);
  const postData = (menu) => {
    if (!menu) return null;

    return ({
      path: `/${menu.type}/`,
      name: menu.name,
    });
  };

  const groupData = (typePath, name) => {
    if (!currentGroup) return null;

    const data = allMdx.group.find((mdxGroup) => mdxGroup.fieldValue === currentGroup);

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
    postBreadcrumb,
    groupBreadcrumb,
    postIsIndex,
  });
}
