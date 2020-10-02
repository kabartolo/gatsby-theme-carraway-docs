import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { useSiteMetadata } from '../hooks';

export default function SEO({ description, title, path }) {
  const {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
  } = useSiteMetadata();

  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaUrl = `${siteUrl}${path}`;
  const metaDescription = description || siteDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLanguage,
      }}
      title={metaTitle}
      meta={[
        { name: 'description', content: metaDescription },
      ]}
      link={[
        { rel: 'canonical', href: `${metaUrl}` },
      ]}
    />
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
};

SEO.defaultProps = {
  title: '',
  description: '',
  path: '',
};
