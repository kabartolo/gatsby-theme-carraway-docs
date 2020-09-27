/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './layout.module.scss';

import { SiteContext } from './site-context';
import { PostContext } from './post-context';

import Header from '../Header';
import Sidebar from '../Sidebar';
import SEO from '../Post/SEO';
import Footer from '../Footer';

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
