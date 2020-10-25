/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Link } from 'gatsby';

import { useSiteMetadata } from '../../../hooks';

import Logo from './logo';

import styles from './header.module.scss';

export default function SiteTitle() {
  const { siteLogo, title } = useSiteMetadata();

  return (
    <Styled.a
      as={Link}
      to="/"
      className="header-site-title-link"
      sx={{
        color: 'siteTitle',
        textDecoration: 'none',
        ':hover': {
          color: 'siteTitleHover',
        },
      }}
    >
      <h1
        className={`header-site-title-logo ${styles.siteTitle}`}
        title={title}
      >
        {siteLogo && <Logo src={siteLogo} />}
        <span className={`header-site-title-text ${styles.siteTitleText}`}>
          {title}
        </span>
      </h1>
    </Styled.a>
  );
}
