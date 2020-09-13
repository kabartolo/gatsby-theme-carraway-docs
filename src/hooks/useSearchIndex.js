import { graphql, useStaticQuery } from 'gatsby';

function useSearchIndex() {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `);

  return siteSearchIndex.index;
}

export { useSearchIndex };
