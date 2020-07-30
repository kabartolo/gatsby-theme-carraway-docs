import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import styles from './layout.module.scss';

import { PostContext } from './post-context';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

export default function Layout({
  children,
  menus,
  sidebarOptions,
  github,
  location,
}) {
  const [postType, setPostType] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [postID, setPostID] = useState('');

  return (
    <div className={styles.container}>
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
        <div
          id="page-wrapper"
          className={styles.wrapper}
        >
          <>
            <Header
              menu={menus.main}
              github={github}
              location={location}
            />
            <Sidebar
              menus={menus.sidebar}
              options={sidebarOptions}
              location={location}
            />
          </>
          <main id="main" className={styles.main}>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child, { menus });
              }
              return child;
            })}
            <Footer />
          </main>
        </div>
      </PostContext.Provider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menus: PropTypes.instanceOf(Object),
  sidebarOptions: PropTypes.instanceOf(Object).isRequired,
  github: PropTypes.string,
  location: PropTypes.instanceOf(Object).isRequired,
};

Layout.defaultProps = {
  menus: { main: {}, sidebar: {} },
  github: null,
};
