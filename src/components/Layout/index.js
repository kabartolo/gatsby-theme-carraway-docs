/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';

import { PostContext } from './post-context';
import { SiteContext } from './site-context';

import SEO from '../SEO';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

import styles from './layout.module.scss';

export default function Layout({
  children,
  menus,
  options,
  location: locationProp,
}) {
  const [postId, setPostId] = useState('');
  const [menu, setMenu] = useState([]);
  const [location, setLocation] = useState(locationProp);
  const [themeOptions, setThemeOptions] = useState(options);
  const [showSidebar, setShowSidebar] = useState();

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
      <SkipNavLink style={{ zIndex: 100 }} />
      <SEO />
      <div className={styles.wrapper}>
        <PostContext.Provider
          value={{
            postId,
            setPostId,
            menu,
            setMenu,
            showSidebar,
            setShowSidebar,
          }}
        >
          <>
            <Header menu={menus.main} />
            <Sidebar />
          </>
          <SkipNavContent />
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
