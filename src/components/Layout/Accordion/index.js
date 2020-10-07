/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useLocation, useThemeOptions } from '../../../hooks';

import styles from './accordion.module.scss';

export default function Accordion({
  activeId,
  items: parentItems,
  onClickLink,
  outerOpenSections,
}) {
  const { sidebarAllowMultipleOpen: allowMultipleOpen } = useThemeOptions();
  const location = useLocation();
  const activePost = parentItems.find((item) => (
    item.path === location.pathname
    && !item.path.match('#')
  ));

  /* eslint-disable no-param-reassign */
  const sections = parentItems.reduce((map, item) => {
    if (item.isOpen) {
      map[item.name] = true;
    }
    return map;
  }, outerOpenSections);
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
    <ul className={`accordion-list ${styles.accordion}`}>
      {parentItems.map((item) => {
        const {
          id,
          name,
          path,
          slug,
          isGroup,
          items,
        } = item;
        const currentLinkClass = item === activePost ? 'activePost' : '';
        const activeIdMatches = activeId && path && path.match(`#${activeId}`);
        const currentHeaderClass = path.match(location.pathname) && activeIdMatches ? 'activeHeader' : '';
        const isOpen = openSections[name];

        const label = path
          ? (
            <Styled.a
              as={Link}
              to={path}
              onClick={() => {
                onClickLink();
                onClick(name, true);
              }}
              className={`accordion-link ${currentLinkClass || currentHeaderClass}`}
              sx={{ variant: ['links.accordion', isGroup ? 'links.accordionGroup' : ''] }}
            >
              {name}
            </Styled.a>
          )
          : name;

        const icon = isOpen
          ? <FontAwesomeIcon icon={faChevronUp} />
          : <FontAwesomeIcon icon={faChevronDown} />;

        return items && items.length
          ? (
            <li
              key={id || slug}
              className={`accordion-list-item ${styles.listItem}`}
              sx={{ variant: 'listItems.accordion' }}
            >
              <h3 className={`accordion-row ${styles.link}`}>
                <span className={`accordion-row-label ${styles.label}`}>{label}</span>
                <button
                  type="button"
                  onClick={() => onClick(name)}
                  className={`accordion-row-button ${styles.button}`}
                  sx={{ variant: 'buttons.accordion' }}
                >
                  {icon}
                </button>
              </h3>
              {isOpen && (
                <Accordion
                  activeId={activeId}
                  items={items}
                  onClickLink={onClickLink}
                  outerOpenSections={openSections}
                />
              )}
            </li>
          )
          : (
            <li
              key={id}
              className={`accordion-list-item ${styles.listItem}`}
              sx={{ variant: 'listItems.accordion' }}
            >
              <h3 className="accordion-row">{label}</h3>
            </li>
          );
      })}
    </ul>
  );
}

Accordion.propTypes = {
  activeId: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onClickLink: PropTypes.func.isRequired,
  outerOpenSections: PropTypes.instanceOf(Object),
};

Accordion.defaultProps = {
  outerOpenSections: {},
};
