/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, useColorMode } from 'theme-ui';
import React, { useEffect } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import {
  useDocContext,
  useTableOfContents,
  useThemeOptions,
} from '../../../hooks';

import Breadcrumb from './Breadcrumb';
import NavLink from './NavLink';
import SEO from '../../../components/SEO';
import TOC from '../../../components/TOC';

import styles from './doc.module.scss';

import { shortcodes } from '../../../components/shortcodes';

export default function Doc({ data: { doc }, pageContext }) {
  const {
    setDocId,
    setMenu,
    setShowSidebar,
  } = useDocContext();

  const { allowBreadCrumbs } = useThemeOptions();
  const tableOfContents = useTableOfContents(doc && doc.id);
  const {
    menu,
    breadcrumb,
    previous,
    next,
  } = pageContext;

  // Set doc context
  useEffect(() => {
    if (doc == null) return () => {};
    setDocId(doc.id);
    setMenu(menu);
    setShowSidebar(doc.showSidebar);
    return () => {
      setDocId(null);
      setMenu({});
      setShowSidebar(false);
    };
  });

  if (doc == null) {
    throw new Error('Error: Doc does not exist or might contain errors.');
  }

  const {
    title,
    description,
    body,
    path,
    slug,
    showTOC,
    showPostNav,
  } = doc;

  const tocVisible = showTOC && !!(tableOfContents.nested && tableOfContents.nested.items);

  return (
    <article id={slug} className={styles.article}>
      <SEO title={title} description={description} path={path} />
      {allowBreadCrumbs && breadcrumb && (
        <Breadcrumb
          data={breadcrumb}
          path={path}
          title={title}
          slug={slug}
        />
      )}
      <header className={styles.pageHeader}>
        <h1>{title}</h1>
      </header>
      <div className={`article-main ${styles.main} ${tocVisible ? styles.withToc : ''}`}>
        {tocVisible && <TOC contents={tableOfContents.nested} className={styles.tocContainer} />}
        <div className={`article-content ${styles.articleContent}`}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
      {showPostNav && (
        <nav className={styles.postNav}>
          <span className={styles.previous}>
            {previous && (
              <NavLink
                direction="previous"
                path={previous.path}
                title={previous.label}
              />
            )}
          </span>
          <span className={styles.next}>
            {next && (
              <NavLink
                direction="next"
                path={next.path}
                title={next.label}
              />
            )}
          </span>
        </nav>
      )}
    </article>
  );
}

Doc.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  pageContext: PropTypes.instanceOf(Object).isRequired,
};