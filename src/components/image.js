import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

export default function Image({
  alt,
  data,
  src,
  title,
}) {
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
  if (!image) return null;

  const { fluid, fixed } = image.childImageSharp;

  return (
    <Img
      fluid={fluid}
      fixed={fixed}
      alt={alt}
      title={title || alt}
    />
  );
}

Image.propTypes = {
  alt: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
  data: {},
  title: '',
};
