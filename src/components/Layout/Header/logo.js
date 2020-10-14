import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Image from '../../image';

import { useSiteMetadata } from '../../../hooks';

export default function Logo({ src }) {
  const { siteTitle } = useSiteMetadata();
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
    <Image src={src} data={data} title={siteTitle} />
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
};
