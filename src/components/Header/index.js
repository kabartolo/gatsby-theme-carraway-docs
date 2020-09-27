/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWindowClose,
  faCloudMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { useThemeOptions, useSiteMetadata } from '../../hooks';

import styles from './header.module.scss';

import Dropdown from '../Dropdown';
import Logo from './Logo';
import MainMenu from '../MainMenu';
import Search from '../Search';
import Toggle from '../Toggle';

const menuIcon = <FontAwesomeIcon icon={faBars} />;
const closeIcon = <FontAwesomeIcon icon={faWindowClose} />;
const sunIcon = <FontAwesomeIcon sx={{ variant: 'icons.sun' }} icon={faSun} />;
const moonIcon = <FontAwesomeIcon sx={{ variant: 'icons.moon' }} icon={faCloudMoon} />;
const githubIcon = <FontAwesomeIcon icon={faGithub} />;

export default function Header({
  menu,
}) {
  const { siteTitle, githubURL, siteLogo } = useSiteMetadata();
  const { toggleTheme: useThemeToggle } = useThemeOptions();
  const [mode, setMode] = useColorMode();

  function toggleTheme() {
    setMode(mode === 'dark' ? 'default' : 'dark');
  }

  function ThemeToggle() {
    return (
      <Toggle
        onToggle={() => toggleTheme()}
        icon1={mode === 'dark' ? sunIcon : moonIcon}
        icon2={mode === 'dark' ? moonIcon : sunIcon}
        name="theme-toggle"
      />
    );
  }

  function GithubLink() {
    return (
      <a
        sx={{ variant: 'icons.github' }}
        href={githubURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {githubIcon}
      </a>
    );
  }

  return (
    <div
      id="header"
      className={styles.container}
      sx={{ variant: 'divs.header' }}
    >
      <span className={styles.header}>
        <Styled.a as={Link} sx={{ variant: 'links.siteTitle' }} to="/">
          <h1 className={styles.siteTitle}>
            {siteLogo && <Logo src={siteLogo} />}
            {siteTitle}
          </h1>
        </Styled.a>
        <span className={styles.headerContent}>
          <MainMenu
            menu={menu}
            linkVariant="links.mainMenu"
            listItemVariant="listItems.mainMenu"
          />
          <span className={styles.headerRight}>
            <Search />
            <div className={styles.icons}>
              {githubURL && <GithubLink />}
              {useThemeToggle && <ThemeToggle />}
            </div>
          </span>
        </span>
        <span className={styles.mobileMenu}>
          <Dropdown
            openIcon={menuIcon}
            closeIcon={closeIcon}
            themeUI={{ variant: 'divs.mobileMenu' }}
          >
            <div className={styles.icons}>
              {githubURL && <GithubLink />}
              {useThemeToggle && <ThemeToggle />}
            </div>
            <Search />
            <MainMenu
              menu={menu}
              linkVariant="links.dropdown"
              listItemVariant="listItems.dropdown"
            />
          </Dropdown>
        </span>
      </span>
    </div>
  );
}

Header.propTypes = {
  menu: PropTypes.shape({
    items: PropTypes.instanceOf(Array).isRequired,
  }),
};

Header.defaultProps = {
  menu: { items: [] },
};
