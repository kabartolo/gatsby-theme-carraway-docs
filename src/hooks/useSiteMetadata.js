import { graphql, useStaticQuery } from 'gatsby';

function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteLogo
          siteLanguage
          githubURL
        }
      }
    }
  `);

  return data.site.siteMetadata;
}

export { useSiteMetadata };
