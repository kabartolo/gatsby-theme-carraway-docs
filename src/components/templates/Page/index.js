/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, useColorMode } from 'theme-ui';
import React, { useEffect } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import SEO from '../../SEO';

import styles from './page.module.scss';

import { usePrismTheme } from '../../../hooks';

import { shortcodes } from '../../shortcodes';

export default function Page({ data: { page } }) {
  const {
    title,
    description,
    body,
    path,
    showTitle,
  } = page;
  const prismTheme = usePrismTheme();

  // Add style to linked headers added by gatsby-remark-autolink-headers
  // Unfortunately only done on browser side for now
  useEffect(() => {
    const headers = document.getElementsByClassName('anchor', 'before');
    Array.from(headers).forEach((header) => {
      header.classList.add(styles.headerLink);
      header.parentElement.classList.add(styles.header);
    });
  }, [prismTheme]);

  if (page == null) {
    throw new Error('Error: Page does not exist or might contain errors.');
  }

  return (
    <section className={styles.container}>
      <SEO title={title} description={description} path={path} />
      {showTitle && (
        <header className={styles.pageHeader}>
          <h1>{title}</h1>
        </header>
      )}
      <div className={`page-main ${styles.main}`}>
        <div className={`page-content ${styles.pageContent}`}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </section>
  );
}

export const pageQuery = graphql`
  query ($id: String) {
    page(id: { eq: $id }) {
      id
      title
      description
      body
      path
    }
  }
`;

Page.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
