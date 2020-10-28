/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  getFragment,
  hasCurrentPageFragment,
  isActiveUrl,
} from '../../../utils/path-helpers';

import { useLocation, useThemeOptions } from '../../../hooks';

import FlexibleLink from '../../flexible-link';

import styles from './accordion.module.scss';

export default function Accordion({
  activeId,
  items: parentItems,
  onClickLink,
  outerOpenSections,
}) {
  const { sidebarAllowMultipleOpen: allowMultipleOpen } = useThemeOptions();
  const location = useLocation();

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
        const isActiveHeader = isActiveUrl(activeId, path, location.pathname);
        const activeHeaderClass = isActiveHeader ? 'activeHeader' : '';

        const isOpen = openSections[name];

        const isFragmentLink = hasCurrentPageFragment(path, location.pathname);
        const pathForFlexibleLink = isFragmentLink ? getFragment(path) : path;

        // If there's no path, just print the name of the post or group
        const label = path ? (
          <FlexibleLink
            activeClassName="activePost"
            className={`
              accordion-link
              ${isActiveHeader ? activeHeaderClass : ''}
              ${isGroup ? styles.group : styles.link}
            `}
            onClick={() => {
              onClickLink();
              onClick(name, true);
            }}
            href={pathForFlexibleLink}
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
            <li
              key={id || slug}
              className={`accordion-list-item ${styles.listItem}`}
              sx={{ variant: 'listItems.layout' }}
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
            </li>
          )
          : (
            <li
              key={id}
              className={`accordion-list-item ${styles.listItem}`}
              sx={{ variant: 'listItems.layout' }}
            >
              <h3 className={`accordion-row ${styles.row}`}>{label}</h3>
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
