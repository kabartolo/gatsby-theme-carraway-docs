/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import Breadcrumb from './Breadcrumb';
import NavLink from './NavLink';
import CodeBlock from '../CodeBlock';
import CodeExample from '../CodeExample';
import Section from '../Section';
import TOC from '../TOC';
import PropertyTable from '../PropertyTable';

import themeComponents from '../../gatsby-plugin-theme-ui/components';

import usePostContext from '../../hooks/usePostContext';
import useTableOfContents from '../../hooks/useTableOfContents';
import useThemeOptions from '../../hooks/useThemeOptions';
import useSiteMetadata from '../../hooks/useSiteMetadata';

import styles from './post.module.scss';

const shortcodes = {
  ...themeComponents,
  Link,
  code: CodeBlock,
  CodeExample,
  Section,
  TOC,
  PropertyTable,
};

export default function Post({ data: { post }, pageContext }) {
  const {
    setPostID,
  } = usePostContext();
  const { allowBreadCrumbs } = useThemeOptions();
  const { title: siteTitle } = useSiteMetadata();
  const tableOfContents = useTableOfContents(post.id);
  const { breadcrumb, previous, next } = pageContext;
  const leftArrow = <FontAwesomeIcon icon={faAngleDoubleLeft} />;
  const rightArrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;

  // Set post context
  useEffect(() => {
    if (post == null) return;
    setPostID(post.id);
  });

  // Add style to linked headers added by gatsby-remark-autolink-headers
  useEffect(() => {
    const headers = document.getElementsByClassName('anchor', 'before');
    Array.from(headers).forEach((header) => {
      header.classList.add(styles.headerLink);
      header.parentElement.classList.add(styles.header);
    });
  });

  if (post == null) {
    return (
      <div id="post-container" className={styles.article}>
        <p>Error: Post does not exist or may contain errors.</p>
      </div>
    );
  }

  const {
    id,
    title,
    description,
    body,
    path,
    slug,
    showTOC,
  } = post;

  const tocVisible = showTOC && !!tableOfContents.nested.items;

  return (
    <article id={slug} className={styles.article}>
      <Helmet titleTemplate={`%s | ${siteTitle}`}>
        <title>{title}</title>
        <meta property="description" content={description} />
      </Helmet>
      {allowBreadCrumbs && (
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
      <div id="article-main" className={`article-main ${styles.main} ${tocVisible ? styles.withToc : ''}`}>
        {tocVisible && <TOC contents={tableOfContents.nested} className={styles.tocContainer} />}
        <div id="article-content" className={styles.articleContent}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
      <nav className={styles.postNav}>
        <span className={styles.previous}>
          {previous && (
            <NavLink path={previous.path}>
              <div className={styles.navLinkLabel} sx={{ variant: 'as.navLinkLabel' }}>
                {leftArrow}
                <span>Previous</span>
              </div>
              <span sx={{ variant: 'as.navLink' }}>{previous.label}</span>
            </NavLink>
          )}
        </span>
        <span className={styles.next}>
          {next && (
            <NavLink path={next.path}>
              <div className={styles.navLinkLabel} sx={{ variant: 'as.navLinkLabel' }}>
                <span>Next</span>
                {rightArrow}
              </div>
              <span sx={{ variant: 'as.navLink' }}>{next.label}</span>
            </NavLink>
          )}
        </span>
      </nav>
    </article>
  );
}

export const pageQuery = graphql`
  query ($id: String) {
    post(id: { eq: $id }) {
      id
      body
      path
      title
      slug
      description
      showTOC
    }
  }
`;

Post.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
