/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './src/components/Layout';

const wrapPageElement = ({ element, props: { location }, ...props }) => (
  <Wrapper location={location} {...props}>
    {element}
  </Wrapper>
);

export default wrapPageElement;

wrapPageElement.propTypes = {
  element: PropTypes.element.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  props: PropTypes.instanceOf(Object).isRequired,
};
