import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Link } from 'gatsby';

import CodeBlock from '../CodeBlock';
import CodeExample from '../CodeExample';
import TopicArea from '../TopicArea';

import { PostContext } from '../Layout/post-context';

import useBreadcrumb from '../../hooks/useBreadcrumb';

import styles from './post.module.scss';

const shortcodes = {
  Link,
  code: CodeBlock,
  CodeExample,
  TopicArea,
};

export default function Post({ data: { post }, menus }) {
  const {
    setPostType,
    setCurrentGroup,
    setPostID,
  } = useContext(PostContext);

  useEffect(() => {
    if (post == null) return;
    setPostType(post.postType);
    setCurrentGroup(post.group);
    setPostID(post.id);
  });

  const breadcrumb = useBreadcrumb(menus.sidebar, post);

  if (post == null) {
    return (
      <div id="post-container" className={styles.article}>
        <p>Error: Post does not exist or may contain errors.</p>
      </div>
    );
  }

  const {
    title,
    body,
    path,
  } = post;

  return (
    <article id="post-container" className={styles.article}>
      <nav>
        {breadcrumb.post && (
          <>
            <span><Link to={breadcrumb.post.path}>{breadcrumb.post.name}</Link></span>
          </>
        )}
        {breadcrumb.group && (
          <>
            {breadcrumb.post && <span> &#47; </span>}
            <span>
              {breadcrumb.group.path
                ? (
                  <Link to={breadcrumb.group.path}>{breadcrumb.group.name}</Link>
                ) : <span>{breadcrumb.group.name}</span>}
            </span>
          </>
        )}
        {!breadcrumb.postIsIndex && (
          <>
            {(breadcrumb.post || breadcrumb.group) && <span> &#47; </span>}
            <span><Link to={path}>{title}</Link></span>
          </>
        )}
      </nav>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </article>
  );
}

export const pageQuery = graphql`
  query ($id: String) {
    post(id: { eq: $id }) {
      id
      body
      postType
      group
      path
      title
    }
  }
`;

Post.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  menus: PropTypes.instanceOf(Object),
};

Post.defaultProps = {
  menus: {},
};
