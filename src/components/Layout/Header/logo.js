import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { useSiteMetadata } from '../../../hooks';

export default function Logo({ src }) {
  const { title } = useSiteMetadata();
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          name
          childImageSharp {
            fixed(height: 30) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    }
  `);

  const image = allFile.nodes.find((node) => node.relativePath === src);
  if (!image) return null;

  return (
    <Img fixed={image.childImageSharp.fixed} title={title} />
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};
