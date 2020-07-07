import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './header.module.scss';

import { ThemeContext } from '../Layout/theme-context';

export default function Header({ children }) {
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

  const { theme } = useContext(ThemeContext);
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  return (
    <div id="header" className={themeClass}>
      <div className={styles.header}>
        <h1 className={styles.title}>{site.siteMetadata.title}</h1>
        {children}
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
