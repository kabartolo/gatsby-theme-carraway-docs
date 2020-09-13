import { graphql, useStaticQuery } from 'gatsby';

function usePostData() {
  const { allPost } = useStaticQuery(graphql`
    query {
      allPost {
        nodes {
          id
          title
          label
          description
          path
          slug
          excerpt
          body
        }
      }
    }
  `);

  return allPost.nodes;
}

export { usePostData };
