/** @jsx jsx */
import { jsx } from 'theme-ui';
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './doc.module.scss';

export default function NavLink({ direction, title, path }) {
  const arrow = direction === 'previous'
    ? <FontAwesomeIcon icon={faAngleDoubleLeft} />
    : <FontAwesomeIcon icon={faAngleDoubleRight} />;

  const label = direction === 'previous'
    ? 'Previous'
    : 'Next';

  return (
    <Link
      to={path}
      className={`nav-link ${styles.navLink}`}
      sx={{
        color: 'primary',
        textDecoration: 'none',
        ':hover': {
          textDecoration: 'underline',
          '.nav-link-label': {
            color: 'primary',
            fontWeight: 'heading',
          },
        },
      }}
    >
      <span
        className={`nav-link-label ${styles.navLinkLabel}`}
        sx={{
          color: 'text',
        }}
      >
        {label}
      </span>
      <div className={styles.icon}>
        {direction === 'previous' && arrow}
        <span
          className={`nav-link-title ${styles.title}`}
          sx={{
            color: 'primary',
            fontWeight: 'heading',
          }}
        >
          {title}
        </span>
        {direction === 'next' && arrow}
      </div>
    </Link>
  );
}

NavLink.propTypes = {
  direction: PropTypes.oneOf(['previous', 'next']).isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
