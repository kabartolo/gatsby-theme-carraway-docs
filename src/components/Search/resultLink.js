/** @jsx jsx */
/* eslint-disable no-unused-vars, no-return-assign */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import styles from './search.module.scss';

export default function ResultLink({
  title,
  heading,
  excerpt,
  path,
  onClick,
}) {
  return (
    <li sx={{ variant: 'divs.searchResult' }}>
      <Styled.a
        as={Link}
        className={styles.resultContainer}
        to={path}
        onClick={onClick}
      >
        <h3>
          <span>
            {title}
          </span>
          {!!heading.length && (
            <span>
              <span>: </span>
              {heading}
            </span>
          )}
        </h3>
        {!!excerpt.length
        && (
          <p>{excerpt}</p>
        )}
      </Styled.a>
    </li>
  );
}

ResultLink.propTypes = {
  title: PropTypes.instanceOf(Array).isRequired,
  heading: PropTypes.instanceOf(Array),
  excerpt: PropTypes.instanceOf(Array),
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ResultLink.defaultProps = {
  excerpt: null,
  onClick: () => null,
  heading: null,
};
