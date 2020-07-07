/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './src/components/Layout';

const wrapPageElement = ({ element, ...props }, pluginOptions) => {
  const { menus, sidebarAllowMultipleOpen, sidebarAllowTOC } = pluginOptions;

  return (
    <Layout
      {...props}
      menus={menus}
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
    menus: PropTypes.instanceOf(Object),
  }),
};

wrapPageElement.defaultProps = {
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: true,
    sidebarAllowMultipleOpen: true,
    menus: {},
  }),
};
