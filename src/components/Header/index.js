/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWindowClose,
  faCloudMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import useThemeOptions from '../../hooks/useThemeOptions';
import useSiteMetadata from '../../hooks/useSiteMetadata';

import styles from './header.module.scss';

import Dropdown from '../Dropdown';
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
  const { title, githubURL } = useSiteMetadata();
  const themeOptions = useThemeOptions();
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
    <div id="header" className={styles.container}>
      <span className={styles.header} sx={{ variant: 'spans.header' }}>
        <h1>{title}</h1>
        <span className={styles.headerContent}>
          <MainMenu menu={menu} />
          <span className={styles.headerRight}>
            <Search />
            <div className={styles.icons}>
              {githubURL && <GithubLink />}
              {themeOptions.toggleTheme && <ThemeToggle />}
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
              {themeOptions.toggleTheme && <ThemeToggle />}
            </div>
            <Search />
            <MainMenu menu={menu} />
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
