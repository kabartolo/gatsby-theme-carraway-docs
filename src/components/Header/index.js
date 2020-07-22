import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './header.module.scss';

import useSiteMetadata from '../../hooks/useSiteMetadata';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ThemeContext } from '../Layout/theme-context';

import Dropdown from '../Dropdown';
import Search from '../Search';
import Toggle from '../Toggle';
import Sidebar from '../Sidebar';

export default function Header({ location, sidebarOptions, menus }) {
  const { width } = useWindowDimensions();
  const useMobileNav = width < 992;
  const { title } = useSiteMetadata();
  const mainMenu = menus.find((menu) => menu.type === 'main');

  const { theme, setTheme } = useContext(ThemeContext);
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div id="header" className={`${themeClass} ${styles.layout}`}>
      <div className={styles.header}>
        <span className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
          <Toggle onToggle={toggleTheme} name="theme-toggle" />
        </span>
        <span className={styles.headerRight}>
          <Search location={location} />
          <span>
            {useMobileNav
              ? (
                <Dropdown label={mainMenu.name}>
                  <Sidebar
                    menus={menus}
                    options={sidebarOptions}
                  />
                </Dropdown>
              )
              : mainMenu && (
                <ul className={styles.mainMenu}>
                  {mainMenu.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          </span>
        </span>
      </div>
    </div>
  );
}

Header.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  menus: PropTypes.instanceOf(Array),
  sidebarOptions: PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  menus: [],
  sidebarOptions: {},
};
