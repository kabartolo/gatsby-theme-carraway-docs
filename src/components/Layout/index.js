import React, { useState } from 'react';
import PropTypes from 'prop-types';

import layoutStyles from './layout.module.scss';
import headerStyles from '../Header/header.module.scss';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import { PostContext } from './post-context';
import { ThemeContext } from './theme-context';

import Dropdown from '../Dropdown';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({
  children,
  menus,
  allowMultipleOpen,
  allowTOC,
}) {
  const [postType, setPostType] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [postID, setPostID] = useState('');
  const [theme, setTheme] = useState('light');
  const { width } = useWindowDimensions();
  const useMobileNav = width < 992;

  return (
    <div className={layoutStyles.container}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
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
          {useMobileNav && (
            <Header className={headerStyles.top}>
              <Dropdown label="Menu">
                <Sidebar
                  menus={menus}
                  allowMultipleOpen={allowMultipleOpen}
                  allowTOC={allowTOC}
                />
              </Dropdown>
            </Header>
          )}
          <div
            id="page-wrapper"
            className={layoutStyles.wrapper}
          >
            {!useMobileNav && (
              <Sidebar
                menus={menus}
                allowMultipleOpen={allowMultipleOpen}
                allowTOC={allowTOC}
              >
                <Header className={headerStyles.sidebar} />
              </Sidebar>
            )}
            <div id="main" className={layoutStyles.main}>
              {children}
              <Footer />
            </div>
          </div>
        </PostContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menus: PropTypes.instanceOf(Array).isRequired,
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
};
