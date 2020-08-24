/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './src/components/Layout';

const wrapPageElement = ({ element, props: { location }, ...props }, pluginOptions) => (
  <Layout
    {...props}
    location={location}
    menus={pluginOptions.menus}
    options={pluginOptions}
  >
    {element}
  </Layout>
);

export default wrapPageElement;

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: PropTypes.bool,
    sidebarAllowMultipleOpen: PropTypes.bool,
    menus: PropTypes.instanceOf(Object),
    toggleTheme: PropTypes.bool,
    allowBreadcrumbs: PropTypes.bool,
    github: PropTypes.string,
  }),
  props: PropTypes.instanceOf(Object).isRequired,
};

wrapPageElement.defaultProps = {
  pluginOptions: PropTypes.shape({
    sidebarAllowTOC: true,
    sidebarAllowMultipleOpen: true,
    menus: {},
    toggleTheme: true,
    allowBreadcrumbs: true,
    github: '',
  }),
};
