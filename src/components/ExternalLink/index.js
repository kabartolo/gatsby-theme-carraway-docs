/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './externalLink.module.scss';

export default function ExternalLink({ href, children }) {
  return (
    <Styled.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="external-link"
    >
      {children}
      <FontAwesomeIcon className={styles.icon} icon={faExternalLinkAlt} />
    </Styled.a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string.isRequired,
};
