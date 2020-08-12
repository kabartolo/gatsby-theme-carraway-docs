import { graphql, useStaticQuery } from 'gatsby';

export default function useSidebar(type) {
  const { allSidebarMenu } = useStaticQuery(graphql`
    query {
      allSidebarMenu {
        nodes {
          menus {
            name
            type
            path
            items {
              name
              type
              path
              items {
                name
                type
                path
              }
            }
          }
        }
      }
    }
  `);

  return allSidebarMenu.nodes[0].menus.find((menu) => menu.type === type);
}
