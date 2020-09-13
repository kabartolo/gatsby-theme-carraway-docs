import { graphql, useStaticQuery } from 'gatsby';

function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          defaultTitle
          siteTitleShort
          siteDescription
          siteAuthor
          siteLanguage
          basePath
          footerText
          githubURL
        }
      }
    }
  `);

  return data.site.siteMetadata;
}

export { useSiteMetadata };
