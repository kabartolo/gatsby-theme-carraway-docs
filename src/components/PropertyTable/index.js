/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './propertyTable.module.scss';

export default function PropertyTable({ title, properties }) {
  return (
    <div sx={{ variant: 'divs.propertyTable' }}>
      <h3 className="title">{title}</h3>
      <ul className={styles.propertyTable}>
        {properties.map((property) => (
          <li key={property.name}>
            <div className={styles.header}>
              <h4 className={`property-name ${styles.name}`}>{property.name}</h4>
              {property.type && <span className="property-type">{property.type}</span>}
            </div>
            {property.info && <div className="property-info">{property.info}</div>}
            <p className={`property-description ${styles.description}`}>{property.description}</p>
            {property.defaultValue && (
              <div>
                <span className="property-default">default value:</span>
                <span className={`property-default-value ${styles.defaultValue}`}>{property.defaultValue}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

PropertyTable.propTypes = {
  title: PropTypes.string,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      info: PropTypes.string,
      defaultValue: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

PropertyTable.defaultProps = {
  title: '',
};
