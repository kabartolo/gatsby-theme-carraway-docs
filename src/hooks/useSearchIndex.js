import { graphql, useStaticQuery } from 'gatsby';

export default function useSearchIndex() {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `);

  return siteSearchIndex.index;
}
