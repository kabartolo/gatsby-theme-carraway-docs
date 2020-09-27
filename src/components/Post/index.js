/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, useColorMode } from 'theme-ui';
import React, { useEffect } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import Alert from '../Alert';
import Breadcrumb from './Breadcrumb';
import CodeBlock from '../CodeBlock';
import CodeExample from '../CodeExample';
import Image from '../Image';
import ExternalLink from '../ExternalLink';
import NavLink from './NavLink';
import Playground from '../Playground';
import PostList from '../PostList';
import PropertyTable from '../PropertyTable';
import Section from '../Section';
import SEO from './SEO';
import TOC from '../TOC';

import themeComponents from '../../gatsby-plugin-theme-ui/components';

import {
  usePostContext,
  usePrismTheme,
  useTableOfContents,
  useThemeOptions,
} from '../../hooks';

import styles from './post.module.scss';

/* eslint-disable react/prop-types */
const shortcodes = {
  ...themeComponents,
  Alert,
  code: CodeBlock,
  CodeExample,
  ExternalLink,
  img: Image,
  Image,
  Link: ({ children, to }) => <Link to={to} sx={{ variant: 'styles.a' }}>{children}</Link>,
  Playground,
  PostList,
  PropertyTable,
  Section,
  TOC,
};
/* eslint-enable react/prop-types */

export default function Post({ data: { post }, pageContext }) {
  const {
    setPostId,
    setMenu,
    setShowSidebar,
  } = usePostContext();
  const { allowBreadCrumbs } = useThemeOptions();
  const tableOfContents = useTableOfContents(post && post.id);
  const {
    menu,
    breadcrumb,
    previous,
    next,
  } = pageContext;
  const leftArrow = <FontAwesomeIcon icon={faAngleDoubleLeft} />;
  const rightArrow = <FontAwesomeIcon icon={faAngleDoubleRight} />;
  const prismTheme = usePrismTheme();

  // Set post context
  useEffect(() => {
    if (post == null) return () => {};
    setPostId(post.id);
    setMenu(menu);
    setShowSidebar(post.showSidebar);
    return () => {
      setPostId(null);
      setMenu(null);
      setShowSidebar(false);
    };
  });

  // Add style to linked headers added by gatsby-remark-autolink-headers
  // Unfortunately only done on browser side for now
  useEffect(() => {
    const headers = document.getElementsByClassName('anchor', 'before');
    Array.from(headers).forEach((header) => {
      header.classList.add(styles.headerLink);
      header.parentElement.classList.add(styles.header);
    });
  }, [prismTheme]);

  if (post == null) {
    throw new Error('Error: Post does not exist or might contain errors.');
  }

  const {
    title,
    description,
    body,
    path,
    slug,
    showTOC,
    showPostNav,
  } = post;

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
      <div id="article-main" className={`article-main ${styles.main} ${tocVisible ? styles.withToc : ''}`}>
        {tocVisible && <TOC contents={tableOfContents.nested} className={styles.tocContainer} />}
        <div id="article-content" className={styles.articleContent}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
      {showPostNav && (
        <nav className={styles.postNav}>
          <span className={styles.previous}>
            {previous && (
              <NavLink path={previous.path}>
                <span className={`nav-link-label ${styles.navLinkLabel}`}>Previous</span>
                <div className={styles.icon}>
                  {leftArrow}
                  <span className={`nav-link-title ${styles.title}`}>{previous.label}</span>
                </div>
              </NavLink>
            )}
          </span>
          <span className={styles.next}>
            {next && (
              <NavLink path={next.path}>
                <span className={`nav-link-label ${styles.navLinkLabel}`}>Next</span>
                <div className={styles.icon}>
                  <span className={`nav-link-title ${styles.title}`}>{next.label}</span>
                  {rightArrow}
                </div>
              </NavLink>
            )}
          </span>
        </nav>
      )}
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
      showSidebar
      showPostNav
    }
  }
`;

Post.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  pageContext: PropTypes.instanceOf(Object).isRequired,
};
