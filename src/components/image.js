import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

export default function Image({
  alt,
  src,
  title,
}) {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 2800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const image = allFile.nodes.find((node) => node.relativePath === src);
  if (!image) return null;

  const { fluid } = image.childImageSharp;

  return (
    <Img
      fluid={fluid}
      alt={alt}
      title={title || alt}
    />
  );
}

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
  title: '',
};
