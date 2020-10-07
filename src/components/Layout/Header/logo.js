import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Image from '../../image';

export default function Logo({ src }) {
  const data = useStaticQuery(graphql`
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

  return (
    <Image src={src} data={data} />
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};
