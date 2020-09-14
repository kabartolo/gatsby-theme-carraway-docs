/** @jsx jsx */
import { jsx } from 'theme-ui';
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function NavLink({ children, path }) {
  return (
    <Link sx={{ variant: 'links.navLink' }} to={path}>
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  path: PropTypes.string.isRequired,
};
