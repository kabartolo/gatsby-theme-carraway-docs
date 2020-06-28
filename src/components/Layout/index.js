import React, { useState } from 'react';
import PropTypes from 'prop-types';

import layoutStyles from './layout.module.css';

import useWindowDimensions from '../../hooks/useWindowDimensions';

import { PostContext } from './post-context';

import Dropdown from '../Dropdown';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({
  children,
  sidebar,
  allowMultipleOpen,
  allowTOC,
}) {
  const [postType, setPostType] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [postID, setPostID] = useState('');
  const { width } = useWindowDimensions();

  const useMobileNav = width < 992;

  return (
    <div className={layoutStyles.container}>
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
        <Header>
          {useMobileNav && (
            <Dropdown label="Menu">
              <Sidebar
                menus={sidebar}
                allowMultipleOpen={allowMultipleOpen}
                allowTOC={allowTOC}
              />
            </Dropdown>
          )}
        </Header>
        <div className={layoutStyles.wrapper}>
          {!useMobileNav && (
            <Sidebar
              menus={sidebar}
              allowMultipleOpen={allowMultipleOpen}
              allowTOC={allowTOC}
            />
          )}
          <div className={layoutStyles.main}>
            {children}
          </div>
        </div>
      </PostContext.Provider>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  sidebar: PropTypes.instanceOf(Object).isRequired,
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
};
