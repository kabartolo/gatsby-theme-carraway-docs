/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { SkipNavContent } from '@reach/skip-nav';

import SEO from '../../../../components/SEO';

import { shortcodes } from '../../../../components/shortcodes';

import styles from './page.module.scss';

export default function Page({ data: { chicagoDocsPage } }) {
  const {
    title,
    description,
    path,
    slug,
    body,
  } = chicagoDocsPage;

  return (
    <section id={slug} className={`page-container ${styles.page}`}>
      <SEO title={title} description={description} path={path} />
      <header>
        <h1>{title}</h1>
      </header>
      <div className="page-main">
        <SkipNavContent />
        <div className="page-content">
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    </section>
  );
}

Page.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
