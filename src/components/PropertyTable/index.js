/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { Children } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import styles from './property-table.module.scss';

/** Renders a table-style list of properties if the table has certain headers.
    All required headers must be in the table.
    Otherwise prints the table as normal. */

const REQUIRED_HEADERS = [
  'name',
  'type',
  'info',
  'default',
  'description',
];

const hasRequiredHeaders = (headers) => {
  const lowerCaseHeaders = headers.map((header) => header.toLowerCase());
  return REQUIRED_HEADERS.every((header) => lowerCaseHeaders.includes(header));
};

function getProperties(table) {
  let properties = [];

  if (table.props.originalType === 'table') {
    const [thead, tbody] = table.props.children;

    let columnHeads = [];
    let rows = [];
    columnHeads = columnHeads.concat(thead.props.children.props.children);
    columnHeads = columnHeads.map((header) => header.props.children);
    rows = rows.concat(tbody.props.children);

    if (!hasRequiredHeaders(columnHeads)) return null;

    properties = Children.map(rows, (row) => {
      const property = {};
      REQUIRED_HEADERS.forEach((header) => {
        property[header] = [];
      });

      Children.forEach(row.props.children, (cell, index) => {
        let key = columnHeads[index];
        const value = cell.props.children;
        if (typeof key === 'string') {
          key = key.toLowerCase();
          if (Object.keys(property).includes(key)) property[key].push(value);
        }
      });

      property.id = `property-table-row-${useUID()}`;
      return property;
    });
  }

  return properties;
}

export default function PropertyTable({ children, title }) {
  const properties = getProperties(children);
  if (!properties) {
    return children;
  }
  return (
    <div
      className={`property-table-container ${styles.container}`}
      sx={{
        borderTop: '2.5px solid',
        borderBottom: '2.5px solid',
        borderColor: 'border',
      }}
    >
      {title && (
        <h3
          className={`property-table-title ${styles.title}`}
          sx={{
            borderBottom: 'main',
            borderColor: 'border',
          }}
        >
          {title}
        </h3>
      )}
      <ul className={`property-table-list ${styles.propertyTable}`}>
        {properties.map((property) => (
          <li
            key={property.id}
            className={`property-table-cell ${styles.cell}`}
            sx={{
              variant: 'listItems.layout',
            }}
          >
            <div className={`property-top-row ${styles.topRow}`}>
              <h4
                className={`property-name ${styles.name}`}
                sx={{
                  bg: 'primary',
                  color: 'background',
                }}
              >
                {property.name}
              </h4>
              {property.type && (
                <span
                  className={`property-type ${styles.type}`}
                  sx={{
                    color: 'grey',
                  }}
                >
                  {property.type}
                </span>
              )}
            </div>
            <div className="second-row">
              <span className={`property-info ${styles.info}`}>
                {property.info}
              </span>
              {(property.default.length > 0 && typeof (property.default[0]) !== 'undefined') && (
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
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

PropertyTable.defaultProps = {
  title: '',
};
