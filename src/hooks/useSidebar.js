import { graphql, useStaticQuery } from 'gatsby';

export default function useSidebar(slug) {
  const { allSidebarMenu } = useStaticQuery(graphql`
    query {
      allSidebarMenu {
        nodes {
          menus {
            id
            name
            path
            slug
            items {
              id
              name
              path
              slug
              isGroup
              items {
                id
                name
                path
                slug
              }
            }
          }
        }
      }
    }
  `);

  return allSidebarMenu.nodes[0].menus.find((menu) => menu.slug === slug);
}
