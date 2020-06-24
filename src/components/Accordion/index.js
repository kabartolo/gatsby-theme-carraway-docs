import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

export default function Accordion({ children, allowMultipleOpen, allowTOC }) {
  /* eslint-disable no-param-reassign */
  const sections = children.reduce((map, child) => {
    if (child.isOpen) {
      map[child.name] = true;
    }
    return map;
  }, {});
  /* eslint-enable no-param-reassign */

  const [openSections, setOpenSections] = useState(sections);

  function onClick(name) {
    const isOpen = !!openSections[name];

    if (allowMultipleOpen) {
      setOpenSections({
        ...openSections,
        [name]: !isOpen,
      });
    } else {
      setOpenSections({
        [name]: !isOpen,
      });
    }
  }

  return (
    <ul>
      {children.map((child) => {
        const {
          id,
          name,
          path,
          items,
        } = child;

        const label = path
          ? <Link to={path}>{name}</Link>
          : name;

        const isOpen = openSections[name];
        const hasItems = (!path && items) || (path && allowTOC && items);

        return hasItems
          ? (
            <li className="accordion-section" key={id}>
              <h3>
                <button
                  type="button"
                  onClick={() => onClick(name)}
                >
                  <span>{label}</span>
                  <span>
                    {!isOpen && <span>&#9650;</span>}
                    {isOpen && <span>&#9660;</span>}
                  </span>
                </button>
              </h3>
              {isOpen && (
                <Accordion allowMultipleOpen={allowMultipleOpen} allowTOC={allowTOC}>
                  {items}
                </Accordion>
              )}
            </li>
          )
          : (
            <li>
              <h3>{label}</h3>
            </li>
          );
      })}
    </ul>
  );
}

Accordion.propTypes = {
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};
