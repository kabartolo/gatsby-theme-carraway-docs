import React, { useState } from 'react';
import PropTypes from 'prop-types';

import layoutStyles from './layout.module.css';
import { PostContext } from './post-context';
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

  return (
    <div className={layoutStyles.container}>
      <Header />
      <div className={layoutStyles.main}>
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
          <Sidebar
            menus={sidebar}
            allowMultipleOpen={allowMultipleOpen}
            allowTOC={allowTOC}
          />
          <div>
            {children}
          </div>
        </PostContext.Provider>
      </div>
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
