import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import headerStyles from './header.module.css';

export default function Header() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `,
  );

  return (
    <div>
      <h1 className={headerStyles.header}>{ site.siteMetadata.title }</h1>
    </div>
  );
}
