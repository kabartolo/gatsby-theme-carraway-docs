/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './src/components/Layout';

const wrapPageElement = ({ element, ...props }, pluginOptions) => {
  const { sidebar, sidebarAllowMultipleOpen, sidebarAllowTOC } = pluginOptions;

  return (
    <Layout
      {...props}
      sidebar={sidebar}
      allowMultipleOpen={sidebarAllowMultipleOpen}
      allowTOC={sidebarAllowTOC}
    >
      {element}
    </Layout>
  );
};

export default wrapPageElement;

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: PropTypes.bool,
    sidebarAllowMultipleOpen: PropTypes.bool,
    sidebar: PropTypes.instanceOf(Object),
  }),
};

wrapPageElement.defaultProps = {
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: true,
    sidebarAllowMultipleOpen: true,
    sidebar: {},
  }),
};
