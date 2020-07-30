/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './src/components/Layout';

const wrapPageElement = ({ element, props: { location }, ...props }, pluginOptions) => {
  const {
    menus,
    sidebarAllowMultipleOpen,
    sidebarAllowTOC,
    github,
  } = pluginOptions;

  return (
    <Layout
      {...props}
      location={location}
      menus={menus}
      sidebarOptions={{
        allowMultipleOpen: sidebarAllowMultipleOpen,
        allowTOC: sidebarAllowTOC,
      }}
      github={github}
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
  props: PropTypes.instanceOf(Object).isRequired,
};

wrapPageElement.defaultProps = {
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: true,
    sidebarAllowMultipleOpen: true,
    menus: {},
  }),
};
