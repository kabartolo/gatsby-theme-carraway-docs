import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import styles from './header.module.scss';

import { ThemeContext } from '../Layout/theme-context';

import Toggle from '../Toggle';

export default function Header({ children, className }) {
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

  const { theme, setTheme } = useContext(ThemeContext);
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div id="header" className={`${themeClass} ${className}`}>
      <div className={styles.header}>
        <div className={styles.main}>
          <h1 className={styles.title}>{site.siteMetadata.title}</h1>
          <Toggle onToggle={toggleTheme} name="theme-toggle" />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};
