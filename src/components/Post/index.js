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

export default function Post({ data: { mdx }, menus }) {
  const { title } = mdx.frontmatter;
  const { body, fields } = mdx;
  const {
    setPostType,
    setCurrentGroup,
    setPostID,
  } = useContext(PostContext);

  useEffect(() => {
    setPostType(fields.postType);
    setCurrentGroup(fields.group);
    setPostID(mdx.id);
  });

  const {
    postBreadcrumb,
    groupBreadcrumb,
    postIsIndex,
  } = useBreadcrumb(menus, fields.path, fields.postType, fields.group);

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
            <span><Link to={fields.path}>{title}</Link></span>
          </>
        )}
      </nav>
      <header>
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
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        postType
        group
        path
      }
      frontmatter {
        title
      }
      tableOfContents(maxDepth: 2)
    }
  }
`;

Post.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
  menus: PropTypes.instanceOf(Array),
};

Post.defaultProps = {
  menus: [],
};
