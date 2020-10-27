/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import styles from './property-table.module.scss';

function getProperties(table) {
  let properties = [];

  if (table.props.originalType === 'table') {
    const [thead, tbody] = table.props.children;
    const columnHeads = thead.props.children.props.children;
    const rows = tbody.props.children;
    properties = Children.map(rows, (row) => {
      const property = {
        id: `property-table-row-${useUID()}`,
        name: [],
        type: [],
        info: [],
        default: [],
        description: [],
      };

      Children.map(row.props.children, (cell, index) => {
        let key = columnHeads[index].props.children;
        const value = cell.props.children;
        if (typeof key === 'string') {
          key = key.toLowerCase();
          property[key].push(value);
        }
      });
      return property;
    });
  }

  return properties;
}

export default function PropertyTable({ children, title }) {
  const properties = getProperties(children);
  return (
    <div
      className={`property-table-container ${styles.container}`}
      sx={{
        borderTop: '2.5px solid',
        borderBottom: '2.5px solid',
        borderColor: 'border',
      }}
    >
      <h3 className={`property-table-title ${styles.title}`}>{title}</h3>
      <ul className={`property-table-list ${styles.propertyTable}`}>
        {properties.map((property) => (
          <li
            key={property.id}
            className={`property-table-cell ${styles.cell}`}
            sx={{
              borderTop: 'main',
              borderColor: 'border',
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
