import { graphql, useStaticQuery } from 'gatsby';

function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          siteLogo
          siteLanguage
          githubUrl
        }
      }
    }
  `);

  return data.site.siteMetadata;
}

export { useSiteMetadata };
