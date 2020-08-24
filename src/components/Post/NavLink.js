import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function NavLink({ children, path }) {
  return (
    <Link style={{ textDecoration: 'none' }} to={path}>
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
