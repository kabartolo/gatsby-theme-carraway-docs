import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'gatsby';

import accordionStyles from './accordion.module.scss';

export default function Accordion({
  items: parentItems,
  allowMultipleOpen,
  allowTOC,
  onClickLink,
}) {
  /* eslint-disable no-param-reassign */
  const sections = parentItems.reduce((map, item) => {
    if (item.isOpen) {
      map[item.name] = true;
    }
    return map;
  }, {});
  /* eslint-enable no-param-reassign */

  const [openSections, setOpenSections] = useState(sections);

  function onClick(name, isLink) {
    const isOpen = !!openSections[name];

    if (isLink && isOpen) return;

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
    <div className={accordionStyles.accordion}>
      <ul className={accordionStyles.list}>
        {parentItems.map((item) => {
          const {
            id,
            name,
            path,
            items,
          } = item;

          const label = path
            ? (
              <Link
                to={path}
                onClick={() => {
                  onClickLink();
                  onClick(name, true);
                }}
              >
                {name}
              </Link>
            )
            : name;

          const isOpen = openSections[name];
          const hasItems = (!path && items) || (path && allowTOC && items);
          const icon = isOpen
            ? (
              <span>
                <i className="material-icons">expand_less</i>
              </span>
            )
            : (
              <span>
                <i className="material-icons">expand_more</i>
              </span>
            );

          return hasItems
            ? (
              <li key={id}>
                <h3 className={path ? accordionStyles.linkItem : accordionStyles.groupItem}>
                  {path && <span className={accordionStyles.link}>{label}</span>}
                  <button
                    className={accordionStyles.button}
                    type="button"
                    onClick={() => onClick(name)}
                  >
                    {!path && <span className={accordionStyles.label}>{label}</span>}
                    <span>{icon}</span>
                  </button>
                </h3>
                {isOpen && (
                  <Accordion
                    allowMultipleOpen={allowMultipleOpen}
                    allowTOC={allowTOC}
                    items={items}
                    dropDown={false}
                    onClickLink={onClickLink}
                  />
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
    </div>
  );
}

Accordion.propTypes = {
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onClickLink: PropTypes.func.isRequired,
};
