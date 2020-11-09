/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import styles from './external-link.module.scss';

export default function ExternalLink({
  children,
  className,
  href,
  showIcon,
  tooltip,
}) {
  return (
    <Styled.a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={`external-link ${className}`}
      title={tooltip}
    >
      {children}
      {showIcon && <FontAwesomeIcon className={styles.icon} icon={faExternalLinkAlt} />}
    </Styled.a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  tooltip: PropTypes.string,
};

ExternalLink.defaultProps = {
  className: '',
  showIcon: true,
  tooltip: '',
};
