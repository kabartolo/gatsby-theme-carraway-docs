/** @jsx jsx */
/* eslint-disable no-param-reassign */
import { jsx, Styled } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from '../../hooks';

import styles from './accordion.module.scss';

export default function Accordion({
  items: parentItems,
  allowMultipleOpen,
  onClickLink,
  activeId,
  outerOpenSections,
}) {
  const location = useLocation();
  const activePost = parentItems.find((item) => (
    item.path === location.pathname
    && !item.path.match('#')
  ));

  const sections = parentItems.reduce((map, item) => {
    if (item.isOpen) {
      map[item.name] = true;
    }
    return map;
  }, outerOpenSections);

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
        const currentHeaderClass = (activeId && path && path.match(`#${activeId}`)) ? 'activeHeader' : '';
        const isOpen = openSections[name];

        const label = path
          ? (
            <Styled.a
              as={Link}
              to={path}
              className={currentLinkClass || currentHeaderClass}
              sx={{ variant: ['links.accordion', isGroup ? 'links.accordionGroup' : ''] }}
              onClick={() => {
                onClickLink();
                onClick(name, true);
              }}
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
            <li className={`accordion-list-item ${styles.listItem}`} key={id || slug}>
              <h3 className={`accordion-row ${isGroup ? '' : styles.link}`}>
                {!isGroup && <span>{label}</span>}
                <button
                  className="accordion-row"
                  sx={{ variant: 'buttons.unstyled' }}
                  type="button"
                  onClick={() => onClick(name)}
                >
                  {isGroup && <span>{label}</span>}
                  <span>{icon}</span>
                </button>
              </h3>
              {isOpen && (
                <Accordion
                  allowMultipleOpen={allowMultipleOpen}
                  items={items}
                  onClickLink={onClickLink}
                  activeId={activeId}
                  outerOpenSections={openSections}
                />
              )}
            </li>
          )
          : (
            <li className={`accordion-list-item ${styles.listItem}`} key={id}>
              <h3 className="accordion-row">{label}</h3>
            </li>
          );
      })}
    </ul>
  );
}

Accordion.propTypes = {
  allowMultipleOpen: PropTypes.bool.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onClickLink: PropTypes.func.isRequired,
  activeId: PropTypes.string.isRequired,
  outerOpenSections: PropTypes.instanceOf(Object),
};

Accordion.defaultProps = {
  outerOpenSections: {},
};
