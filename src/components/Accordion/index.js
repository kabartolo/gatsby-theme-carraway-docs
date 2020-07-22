/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function Accordion({
  items: parentItems,
  location,
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
    <div>
      <ul sx={{ variant: 'lists.accordion' }}>
        {parentItems.map((item) => {
          const {
            id,
            name,
            path,
            items,
          } = item;

          const linkIsCurrent = path && path === `${location.pathname}${location.hash}`;
          const isOpen = openSections[name];
          const hasItems = (!path && items) || (path && allowTOC && items);

          const label = path
            ? (
              <Link
                sx={{ variant: linkIsCurrent ? 'links.current' : 'links.accordion' }}
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
                <h3 sx={{ variant: 'layouts.spaceBetween' }}>
                  {path && <span>{label}</span>}
                  <button
                    sx={{ variant: ['buttons.unstyled', !path && 'layouts.spaceBetween'] }}
                    type="button"
                    onClick={() => onClick(name)}
                  >
                    {!path && <span sx={{ variant: 'text.accordionGroup' }}>{label}</span>}
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
                    location={location}
                  />
                )}
              </li>
            )
            : (
              <li key={id}>
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
  location: PropTypes.instanceOf(Object).isRequired,
};
