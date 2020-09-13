import { graphql, useStaticQuery } from 'gatsby';

function useTableOfContents(postID) {
  const { allPost } = useStaticQuery(graphql`
    query {
      allPost {
        nodes {
          id
          parent {
            ... on Mdx {
              tableOfContents(maxDepth: 6)
            }
          }
          headerFlatMap {
            title
            url
          }
        }
      }
    }
  `);

  const result = allPost.nodes.map((node) => ({
    id: node.id,
    nested: node.parent && node.parent.tableOfContents,
    flatMap: node.headerFlatMap,
  }));

  return postID
    ? result.find((node) => node.id === postID)
    : result;
}

export { useTableOfContents };
