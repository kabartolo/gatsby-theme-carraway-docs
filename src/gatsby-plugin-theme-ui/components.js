/* eslint-disable */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import * as components from '@theme-ui/components';

const tableStyle = {
  th: ({ align, ...props }) => (
    <Styled.th style={align && { textAlign: align }} {...props} />
  ),
  td: ({ align, ...props }) => (
    <Styled.td style={align && { textAlign: align }} {...props} />
  ),
};

export default {
  ...components,
  ...tableStyle,
};
