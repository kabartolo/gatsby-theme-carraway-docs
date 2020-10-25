/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { useLocation, useThemeOptions } from '../../../hooks';

import FlexibleLink from '../../flexible-link';

import styles from './accordion.module.scss';

export default function Accordion({
  activeId,
  items: parentItems,
  onClickLink,
  outerOpenSections,
}) {
  let activePostId;
  const { sidebarAllowMultipleOpen: allowMultipleOpen } = useThemeOptions();
  const location = useLocation();
  const activePost = parentItems.find((item) => (
    item.path === location.pathname
    && !item.path.match('#')
  ));
  if (activePost) activePostId = activePost.id;

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
        const currentLinkClass = id === activePostId ? 'activePost' : '';
        const activeURL = new RegExp(`#${activeId}$`);
        const activeIdMatches = activeId && path && activeURL.test(path);
        const currentHeaderClass = path.match(location.pathname) && activeIdMatches ? 'activeHeader' : '';
        const isOpen = openSections[name];
        console.log(name);
        console.log(items);
        const label = path ? (
          <FlexibleLink
            className={`
              accordion-link
              ${currentLinkClass || currentHeaderClass}
              ${isGroup ? styles.group : styles.link}
            `}
            onClick={() => {
              onClickLink();
              onClick(name, true);
            }}
            href={path}
            sx={{
              variant: 'links.hover',
              '&.activePost': {
                color: 'secondary',
                fontWeight: 'bold',
              },
              '&.activeHeader': {
                color: 'secondary',
              },
            }}
          >
            {name}
          </FlexibleLink>
        ) : name;

        const icon = isOpen
          ? <FontAwesomeIcon icon={faChevronUp} />
          : <FontAwesomeIcon icon={faChevronDown} />;

        return items && items.length
          ? (
            <Styled.li
              key={id || slug}
              className={`accordion-list-item ${styles.listItem}`}
            >
              <h3 className={`accordion-row ${styles.row}`}>
                <span className={`accordion-row-label ${styles.label}`}>{label}</span>
                <button
                  type="button"
                  onClick={() => onClick(name)}
                  className={`accordion-row-button ${styles.button}`}
                  sx={{ variant: 'buttons.default' }}
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
            </Styled.li>
          )
          : (
            <Styled.li
              key={id}
              className={`accordion-list-item ${styles.listItem}`}
            >
              <h3 className={`accordion-row ${styles.row}`}>{label}</h3>
            </Styled.li>
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
