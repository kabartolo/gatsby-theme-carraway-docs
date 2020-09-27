import { graphql, useStaticQuery } from 'gatsby';

function useTableOfContents(postId) {
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

  return postId
    ? result.find((node) => node.id === postId)
    : result;
}

export { useTableOfContents };
