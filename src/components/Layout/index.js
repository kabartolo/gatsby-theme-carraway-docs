/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, useColorMode } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import styles from './layout.module.scss';

import { SiteContext } from './site-context';
import { PostContext } from './post-context';
import useSiteMetadata from '../../hooks/useSiteMetadata';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

import Toggle from '../Toggle';

export default function Layout({
  children,
  menus,
  options,
  location: locationProp,
}) {
  const [postType, setPostType] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [postID, setPostID] = useState('');
  const [location, setLocation] = useState(locationProp);
  const [themeOptions, setThemeOptions] = useState(options);

  const { title } = useSiteMetadata();

  const sunIcon = <FontAwesomeIcon sx={{ variant: 'icons.sun' }} icon={faSun} />;
  const moonIcon = <FontAwesomeIcon sx={{ variant: 'icons.moon' }} icon={faCloudMoon} />;
  const githubIcon = <FontAwesomeIcon icon={faGithub} />;

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
        href={themeOptions.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        {githubIcon}
      </a>
    );
  }

  useEffect(() => {
    setLocation(locationProp);
    setThemeOptions(options);
  }, [locationProp, options]);

  return (
    <SiteContext.Provider
      value={{
        location,
        setLocation,
        themeOptions,
        setThemeOptions,
      }}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className={styles.wrapper}>
        <PostContext.Provider
          value={{
            postType,
            setPostType,
            currentGroup,
            setCurrentGroup,
            postID,
            setPostID,
          }}
        >
          <>
            <Header
              menu={menus.main}
            >
              {themeOptions.github && <GithubLink />}
              {themeOptions.toggleTheme && <ThemeToggle />}
            </Header>
            <Sidebar />
          </>
          <main id="main" className={styles.main}>
            {children}
            <Footer />
          </main>
        </PostContext.Provider>
      </div>
    </SiteContext.Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menus: PropTypes.instanceOf(Object),
  location: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
};

Layout.defaultProps = {
  menus: { main: {}, sidebar: {} },
};
