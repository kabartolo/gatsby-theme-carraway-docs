/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useState,
  useEffect,
} from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { SkipNavLink } from '@reach/skip-nav';

import { DocContext } from './doc-context';
import { SiteContext } from './site-context';

import Footer from './Footer';
import Header from './Header';
import SEO from '../SEO';
import Sidebar from './Sidebar';

import styles from './layout.module.scss';

export function Wrapper({ children, location: locationProp }) {
  const [location, setLocation] = useState(locationProp);

  useEffect(() => {
    setLocation(locationProp);
  }, [locationProp]);

  return (
    <SiteContext.Provider
      value={{
        location,
        setLocation,
      }}
    >
      <Layout>
        {children}
      </Layout>
    </SiteContext.Provider>
  );
}

export default function Layout({ children }) {
  const [docId, setDocId] = useState('');
  const [showSidebar, setShowSidebar] = useState();
  const [menu, setMenu] = useState({});

  return (
    <div className="layout-container">
      <SkipNavLink style={{ zIndex: 100 }} />
      <SEO />
      <div className={`layout-wrapper ${styles.wrapper}`}>
        <DocContext.Provider
          value={{
            docId,
            setDocId,
            menu,
            setMenu,
          }}
        >
          <>
            <Header />
            {showSidebar && <Sidebar />}
          </>
          <div className={`layout-main-wrapper ${styles.mainWrapper}`}>
            <main id="main" className={`layout-main ${styles.main}`}>
              {Children.map(children, (child) => {
                if (isValidElement(child)) {
                  return cloneElement(child, { setShowSidebar });
                }
                return child;
              })}
            </main>
            <Footer className={showSidebar ? 'with-sidebar' : ''} />
          </div>
        </DocContext.Provider>
      </div>
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
