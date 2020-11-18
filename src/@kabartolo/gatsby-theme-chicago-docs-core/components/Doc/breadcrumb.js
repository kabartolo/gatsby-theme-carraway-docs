import React from 'react';
import PropTypes from 'prop-types';
import { Styled } from 'theme-ui';
import { Link } from 'gatsby';

import { useThemeOptions } from '../../../../hooks';

import styles from './doc.module.scss';

export default function Breadcrumb({ data }) {
  const { basePath, basePathLabel } = useThemeOptions();
  const last = data.slice(-1)[0];
  const first = data.length > 1 ? data[0] : null;
  const middle = data.length > 2 ? data.slice(1, -1) : null;

  return (
    <nav className={`breadcrumb-nav ${styles.breadcrumb}`}>
      <span key={basePath}>
        <Styled.a as={Link} to={basePath}>
          {basePathLabel}
        </Styled.a>
      </span>
      {first && (
        <span key={first.path}>
          <span> &#47; </span>
          <span>
            <Styled.a as={Link} to={first.path}>
              {first.name}
            </Styled.a>
          </span>
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
          <span> &#47; </span>
          <span>{last.name}</span>
        </span>
      )}
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
};
