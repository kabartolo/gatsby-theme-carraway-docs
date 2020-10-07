/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWindowClose,
  faCloudMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { useSiteMetadata, useThemeOptions } from '../../../hooks';

import Dropdown from '../Dropdown';
import Logo from './logo';
import MainMenu from '../MainMenu';
import Search from '../../Search';
import Toggle from '../Toggle';

import styles from './header.module.scss';

const menuIcon = <FontAwesomeIcon icon={faBars} />;
const closeIcon = <FontAwesomeIcon icon={faWindowClose} />;
const githubIcon = <FontAwesomeIcon icon={faGithub} />;
const sunIcon = <FontAwesomeIcon sx={{ variant: 'icons.sun' }} icon={faSun} />;
const moonIcon = <FontAwesomeIcon sx={{ variant: 'icons.moon' }} icon={faCloudMoon} />;

export default function Header() {
  const { githubURL, siteLogo, siteTitle } = useSiteMetadata();
  const { allowSiteSearch, toggleTheme: useThemeToggle, mainMenu } = useThemeOptions();
  const [mode, setMode] = useColorMode();

  function toggleTheme() {
    setMode(mode === 'dark' ? 'default' : 'dark');
  }

  function ThemeToggle() {
    return (
      <Toggle
        icon1={mode === 'dark' ? sunIcon : moonIcon}
        icon2={mode === 'dark' ? moonIcon : sunIcon}
        name="theme-toggle"
        onToggle={() => toggleTheme()}
        tooltip="Toggle dark/light mode"
      />
    );
  }

  function GithubLink() {
    return (
      <a
        href={githubURL}
        rel="noopener noreferrer"
        target="_blank"
        sx={{ variant: 'icons.github' }}
        title="Go to GitHub repository"
      >
        {githubIcon}
      </a>
    );
  }

  return (
    <div
      id="header"
      className={`header-container ${styles.container}`}
      sx={{ variant: 'divs.header' }}
    >
      <span className={`header-main ${styles.header}`}>
        <Styled.a
          as={Link}
          to="/"
          className="header-site-title-link"
          sx={{ variant: 'links.siteTitle' }}
        >
          <h1
            className={`header-site-title-logo ${styles.siteTitle}`}
            title={siteTitle}
          >
            {siteLogo && <Logo src={siteLogo} />}
            <span className={`header-site-title-text ${styles.siteTitleText}`}>
              {siteTitle}
            </span>
          </h1>
        </Styled.a>
        <span className={`header-content ${styles.headerContent}`}>
          {MainMenu && (
            <MainMenu
              menu={mainMenu}
              linkVariant="links.mainMenu"
              listItemVariant="listItems.mainMenu"
            />
          )}
          <span className={`header-right ${styles.headerRight}`}>
            {allowSiteSearch && <Search />}
            <div className={`header-icons ${styles.icons}`}>
              {githubURL && <GithubLink />}
              {useThemeToggle && <ThemeToggle />}
            </div>
          </span>
        </span>
        <span className={`header-mobile-menu ${styles.mobileMenu}`}>
          <Dropdown
            openIcon={menuIcon}
            closeIcon={closeIcon}
            themeUI={{ variant: 'divs.mobileMenu' }}
          >
            <div className={`header-mobile-icons ${styles.icons}`}>
              {githubURL && <GithubLink />}
              {useThemeToggle && <ThemeToggle />}
            </div>
            {allowSiteSearch && <Search />}
            {MainMenu && (
              <MainMenu
                menu={mainMenu}
                linkVariant="links.dropdown"
                listItemVariant="listItems.dropdown"
              />
            )}
          </Dropdown>
        </span>
      </span>
    </div>
  );
}
