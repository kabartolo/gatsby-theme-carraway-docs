import { graphql, useStaticQuery } from 'gatsby';

export default function useTableOfContents() {
  const { allPost } = useStaticQuery(graphql`
    query {
      allPost {
        nodes {
          id
          tableOfContents {
            title
            url
          }
          headerFlatMap {
            title
            url
          }
        }
      }
    }
  `);

  return allPost.nodes;
}
