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
    id,
    title,
    body,
    path,
    postType,
    group,
  } = post;

  const {
    setPostType,
    setCurrentGroup,
    setPostID,
  } = useContext(PostContext);

  useEffect(() => {
    setPostType(postType);
    setCurrentGroup(group);
    setPostID(id);
  });

  const {
    postBreadcrumb,
    groupBreadcrumb,
    postIsIndex,
  } = useBreadcrumb(menus, path, postType, group);

  return (
    <article id="post-container" className={styles.article}>
      <nav>
        {postBreadcrumb && (
          <>
            <span><Link to={postBreadcrumb.path}>{postBreadcrumb.name}</Link></span>
          </>
        )}
        {groupBreadcrumb && (
          <>
            {postBreadcrumb && <span> &#47; </span>}
            <span>
              {groupBreadcrumb.path
                ? (
                  <Link to={groupBreadcrumb.path}>{groupBreadcrumb.name}</Link>
                ) : <span>{groupBreadcrumb.name}</span>}
            </span>
          </>
        )}
        {!postIsIndex && (
          <>
            {(postBreadcrumb || groupBreadcrumb) && <span> &#47; </span>}
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
  data: PropTypes.shape({
    post: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
  menus: PropTypes.instanceOf(Array),
};

Post.defaultProps = {
  menus: [],
};
