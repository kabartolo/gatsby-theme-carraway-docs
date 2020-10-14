/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './property-table.module.scss';

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
    <div
      className={`property-table-container ${styles.container}`}
      sx={{ variant: 'divs.propertyTable' }}
    >
      <h3 className={`property-table-title ${styles.title}`}>{title}</h3>
      <ul className={`property-table-list ${styles.propertyTable}`}>
        {properties.map((property) => (
          <li key={property.name} className={`property-table-cell ${styles.cell}`}>
            <div className={`property-top-row ${styles.topRow}`}>
              <h4 className={`property-name ${styles.name}`}>{property.name}</h4>
              {property.type && <span className="property-type">{property.type}</span>}
            </div>
            <div className="second-row">
              <span className={`property-info ${styles.info}`}>
                {property.info}
              </span>
              {(property.default.length > 0) && (
                <span className={`property-default-value ${styles.defaultValue}`}>
                  <em>default: </em>
                  {property.default}
                </span>
              )}
            </div>
            <p className={`property-description ${styles.description}`}>{property.description}</p>
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
