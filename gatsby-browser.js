/* eslint-disable import/prefer-default-export */
import WrappedLayout from './wrapPageElement';

import 'normalize.css';

export const wrapPageElement = WrappedLayout;

/* Prevents scrolling to top when using the search bar */
export const shouldUpdateScroll = ({
  routerProps: { location },
}) => (location.state && !location.state.preventScroll) && location.search === '';
