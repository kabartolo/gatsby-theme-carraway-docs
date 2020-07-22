import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import styles from './layout.module.scss';

import { PostContext } from './post-context';
import { ThemeContext } from './theme-context';

import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

export default function Layout({
  children,
  menus,
  sidebarOptions,
  location,
}) {
  const [postType, setPostType] = useState('');
  const [currentGroup, setCurrentGroup] = useState('');
  const [postID, setPostID] = useState('');
  const [theme, setTheme] = useState('light');

  return (
    <div className={styles.container}>
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
          <div
            id="page-wrapper"
            className={styles.wrapper}
          >
            <>
              <Header
                menus={menus}
                sidebarOptions={sidebarOptions}
                location={location}
              />
              <Sidebar
                menus={menus}
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
  sidebarOptions: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};
