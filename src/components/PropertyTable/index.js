/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './propertyTable.module.scss';

function getProperties(children) {
  const properties = React.Children.map(children, (child) => {
    const property = {
      name: [],
      type: [],
      info: [],
      default: [],
      description: [],
    };
    let prev;

    React.Children.forEach(child.props.children, (grandchild) => {
      if (typeof grandchild === 'string' && grandchild.match(/:/)) {
        const lines = grandchild.split(/\n/);
        lines.forEach((line) => {
          const [key, ...value] = line.split(':');
          if (Array.isArray(property[key])) {
            property[key].push(value.join(':'));
            prev = key;
          } else {
            property[prev].push(line);
          }
        });
      } else {
        property[prev].push(grandchild);
      }
    });
    return property;
  });

  return properties;
}

export default function PropertyTable({ children, title }) {
  const [properties] = useState(getProperties(children));

  return (
    <div className={styles.container} sx={{ variant: 'divs.propertyTable' }}>
      <h3 className="title">{title}</h3>
      <ul className={styles.propertyTable}>
        {properties.map((property) => (
          <li key={property.name}>
            <div className={styles.header}>
              <h4 className={`property-name ${styles.name}`}>{property.name}</h4>
              {property.type && <span className="property-type">{property.type}</span>}
            </div>
            <div className="property-info">{property.info}</div>
            <p className={`property-description ${styles.description}`}>{property.description}</p>
            {(property.default.length > 0) && (
              <div>
                <span className="property-default">default value:</span>
                <span className={`property-default-value ${styles.defaultValue}`}>{property.default}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

PropertyTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

PropertyTable.defaultProps = {
  title: '',
};
