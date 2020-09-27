import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

export default function Image({ src, alt, data }) {
  let queryData = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          name
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  if (Object.keys(data).length) queryData = data;

  const image = queryData.allFile.nodes.find((node) => node.relativePath === src);
  const { fluid, fixed } = image.childImageSharp;
  if (!image) return null;

  return (
    <Img
      fluid={fluid}
      fixed={fixed}
      alt={alt}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  data: PropTypes.instanceOf(Object),
};

Image.defaultProps = {
  alt: '',
  data: {},
};
