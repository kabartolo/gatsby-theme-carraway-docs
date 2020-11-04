/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled, useColorMode } from 'theme-ui';
import React, { useEffect } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { SkipNavContent } from '@reach/skip-nav';

import {
  useDocContext,
  useTableOfContents,
} from '../../../../hooks';

import Breadcrumb from './breadcrumb';
import NavLink from './nav-link';
import SEO from '../../../../components/SEO';
import TOC from '../../../../components/TOC';

import styles from './doc.module.scss';

import { shortcodes } from '../../../../components/shortcodes';

export default function Doc({ data: { doc }, pageContext, setShowSidebar }) {
  const {
    setDocId,
    setMenu,
  } = useDocContext();
  const tableOfContents = useTableOfContents({ docId: doc && doc.id });

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

  const {
    body,
    description,
    path,
    slug,
    title,
    showBreadcrumb,
    showPostNav,
    showSidebar,
    showTOC,
  } = doc;
  const breadcrumbData = Array.isArray(breadcrumb) ? breadcrumb.filter((link) => link.name) : [];
  const printBreadcrumb = showBreadcrumb && !!breadcrumbData.length;
  const printTOC = showTOC && !!(tableOfContents.nested && tableOfContents.nested.items);

  return (
    <article id={slug} className={`article-container ${styles.article} ${showSidebar ? 'with-sidebar' : ''}`}>
      <SEO title={title} description={description} path={path} />
      {printBreadcrumb && (
        <Breadcrumb
          data={breadcrumbData}
          path={path}
          title={title}
          slug={slug}
        />
      )}
      <header className={styles.pageHeader}>
        <Styled.h1>{title}</Styled.h1>
      </header>
      <div className={`article-main ${styles.main} ${printTOC ? styles.withToc : ''}`}>
        {printTOC && (
          <TOC
            contents={tableOfContents.nested}
            className={styles.tocContainer}
            title="Table of Contents"
          />
        )}
        <SkipNavContent />
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
  setShowSidebar: PropTypes.func,
};

Doc.defaultProps = {
  setShowSidebar: () => {},
};
