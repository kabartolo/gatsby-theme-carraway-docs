import { graphql, useStaticQuery } from 'gatsby';

export default function usePostData() {
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
          postType {
            name
            type
            path
          }
          group {
            name
            type
            path
          }
          excerpt
          body
        }
      }
    }
  `);

  return allPost.nodes;
}
