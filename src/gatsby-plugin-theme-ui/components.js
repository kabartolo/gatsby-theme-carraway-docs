/* eslint-disable */
import { Styled } from 'theme-ui';
import * as components from '@theme-ui/components';

import theme from './index';

const styles = Object.keys(theme.styles).reduce((map, style) => {
  if (style === 'pre' || style === 'code') return null;
  return ({
    ...map,
    [style]: Styled[style],
  });
}, {});

export default {
  ...styles,
  ...components,
};
