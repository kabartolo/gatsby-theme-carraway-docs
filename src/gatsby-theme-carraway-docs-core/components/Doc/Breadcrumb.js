import React from 'react';
import PropTypes from 'prop-types';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';

import styles from './doc.module.scss';

export default function Breadcrumb({ data }) {
  if (!data.length || data.length < 2) return null;

  const last = data.slice(-1)[0];
  const first = data.length > 1 ? data[0] : null;
  const middle = data.length > 2 ? data.slice(1, -1) : null;

  return (
    <nav className={styles.breadcrumb}>
      {first && (
        <span key={first.path}>
          <Styled.a as={Link} to={first.path}>
            {first.name}
          </Styled.a>
        </span>
      )}
      {middle && middle.map((section) => (
        <span key={section.path}>
          <span> &#47; </span>
          <span>
            <Styled.a as={Link} to={section.path}>
              {section.name}
            </Styled.a>
          </span>
        </span>
      ))}
      {last && (
        <span key={last.path}>
          {data.length > 1 && <span> &#47; </span>}
          <span>{last.name}</span>
        </span>
      )}
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
