import { graphql, useStaticQuery } from 'gatsby';

function useDocsSearch() {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `);

  return siteSearchIndex;
}

export { useDocsSearch };
