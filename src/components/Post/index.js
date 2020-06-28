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

const shortcodes = {
  Link,
  code: CodeBlock,
  CodeExample,
  TopicArea,
};

export default function Post({ data: { mdx } }) {
  const { title } = mdx.frontmatter;
  const { body, fields } = mdx;

  const { setPostType, setCurrentGroup, setPostID } = useContext(PostContext);

  useEffect(() => {
    setPostType(fields.postType);
    setCurrentGroup(fields.group);
    setPostID(mdx.id);
  });

  return (
    <div>
      <h1>{title}</h1>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </div>
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
};
