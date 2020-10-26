/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import styles from './search.module.scss';

export default function ResultLink({
  excerpt,
  heading,
  onClick,
  path,
  title,
}) {
  return (
    <li
      className={`search-result-list-item ${styles.resultListItem}`}
      sx={{
        borderBottom: 'main',
        borderColor: 'border',
        variant: 'listItems.layout',
        ':first-of-type': {
          borderTop: 'main',
          borderColor: 'border',
        },
        ':hover': {
          bg: 'muted',
        },
        mark: {
          color: 'secondary',
          bg: 'inherit',
        },
      }}
    >
      <Styled.a
        as={Link}
        to={path}
        onClick={onClick}
        className="search-result-link"
        sx={{
          color: 'text',
          textDecoration: 'none',
        }}
      >
        <h3 className={`search-result-header ${styles.resultHeader}`}>
          <span className="search-result-title">
            {title}
          </span>
          {!!heading.length && (
            <span className="search-result-heading">
              <span>: </span>
              {heading}
            </span>
          )}
        </h3>
        {!!excerpt.length
        && (
          <p className={`search-result-excerpt ${styles.resultExcerpt}`}>{excerpt}</p>
        )}
      </Styled.a>
    </li>
  );
}

ResultLink.propTypes = {
  excerpt: PropTypes.instanceOf(Array),
  heading: PropTypes.instanceOf(Array),
  onClick: PropTypes.func,
  path: PropTypes.string.isRequired,
  title: PropTypes.instanceOf(Array).isRequired,
};

ResultLink.defaultProps = {
  excerpt: null,
  heading: null,
  onClick: () => null,
};
