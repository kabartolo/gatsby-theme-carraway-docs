/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
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
import MainMenu from '../MainMenu';
import Search from '../../Search';
import SiteTitle from './site-title';
import Toggle from '../Toggle';

import styles from './header.module.scss';

const menuIcon = <FontAwesomeIcon icon={faBars} />;
const closeIcon = <FontAwesomeIcon icon={faWindowClose} />;
const githubIcon = <FontAwesomeIcon icon={faGithub} />;
const sunIcon = <FontAwesomeIcon sx={{ variant: 'icons.default', color: 'accent' }} icon={faSun} />;
const moonIcon = <FontAwesomeIcon sx={{ variant: 'icons.default' }} icon={faCloudMoon} />;

export default function Header() {
  const { githubUrl } = useSiteMetadata();
  const { allowDocsSearch, toggleTheme: useThemeToggle, mainMenu } = useThemeOptions();
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
        tooltip={mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      />
    );
  }

  function GithubLink() {
    return (
      <a
        href={githubUrl}
        rel="noopener noreferrer"
        target="_blank"
        sx={{ variant: 'icons.default' }}
        title="Go to GitHub repository"
      >
        {githubIcon}
      </a>
    );
  }

  function DropdownHeader() {
    return (
      <div className={`header-mobile-icons ${styles.icons}`}>
        {githubUrl && <GithubLink />}
        {useThemeToggle && <ThemeToggle />}
      </div>
    );
  }

  return (
    <div
      id="header"
      className={`header-container ${styles.container}`}
      sx={{
        borderBottom: 'thick',
        borderColor: 'border',
        bg: 'background',
      }}
    >
      <span className={`header-main ${styles.header}`}>
        <SiteTitle />
        <span className={`header-content ${styles.headerContent}`}>
          {MainMenu && (
            <MainMenu
              menu={mainMenu}
              linkSX={{ variant: 'links.layout' }}
            />
          )}
          <span className={`header-right ${styles.headerRight}`}>
            {allowDocsSearch && <Search />}
            <div className={`header-icons ${styles.icons}`}>
              {githubUrl && <GithubLink />}
              {useThemeToggle && <ThemeToggle />}
            </div>
          </span>
        </span>
        <span className={`header-mobile-menu ${styles.mobileMenu}`}>
          <Dropdown
            openIcon={menuIcon}
            closeIcon={closeIcon}
            themeUI={{
              bg: 'backgroundSecondary',
              borderBottom: 'thick',
              borderColor: 'border',
              boxShadowBottom: 'main',
            }}
          >
            <DropdownHeader />
            {allowDocsSearch && <Search />}
            {MainMenu && (
              <MainMenu
                menu={mainMenu}
                listItemSX={{
                  borderBottom: 'main',
                  borderColor: 'border',
                  ':first-of-type': {
                    borderTop: 'main',
                    borderColor: 'border',
                  },
                }}
                linkSX={{ variant: 'links.layout' }}
              />
            )}
          </Dropdown>
        </span>
      </span>
    </div>
  );
}
