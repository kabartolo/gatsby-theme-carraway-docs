import { graphql, useStaticQuery } from 'gatsby';

export default function useSiteMetadata() {
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
        }
      }
    }
  `);

  return data.site.siteMetadata;
}
