/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import getIds from '../../../utils/get-ids';
import {
  addTOC,
  deepCopy,
  formatTOC,
  markOpenAccordions,
} from '../../../utils/toc-helpers';

import Accordion from '../Accordion';
import Dropdown from '../Dropdown';

import {
  useActiveId,
  useDocContext,
  useLocation,
  useTableOfContents,
  useThemeOptions,
} from '../../../hooks';

import styles from './sidebar.module.scss';

function Menu({
  activeId,
  children,
  closeDropdown,
  items,
}) {
  return (
    <>
      {children}
      <nav className={`sidebar-scrollable ${styles.scrollable}`}>
        <div className={`sidebar-accordion-container ${styles.accordion}`}>
          <Accordion
            activeId={activeId}
            items={items}
            onClickLink={closeDropdown}
          />
        </div>
      </nav>
    </>
  );
}

export default function Sidebar() {
  const {
    docId,
    menu,
    showSidebar,
  } = useDocContext();
  const newMenu = deepCopy(menu);
  const location = useLocation();
  const { sidebarAllowTOC, sidebarDepth } = useThemeOptions();

  const allTableOfContents = useTableOfContents({ depth: sidebarDepth });
  const tableOfContents = allTableOfContents.find((toc) => toc.id === docId);
  const hasTOC = tableOfContents && !!tableOfContents.nested;

  const itemIds = getIds(hasTOC && tableOfContents.nested.items, sidebarDepth);
  const activeId = useActiveId(itemIds, docId);

  if (showSidebar === false || !menu || !menu.items) return null;

  newMenu.items = addTOC(newMenu.items, allTableOfContents);
  if (sidebarAllowTOC) newMenu.items = formatTOC(newMenu.items, sidebarDepth);

  newMenu.items = markOpenAccordions(
    activeId,
    location.pathname,
    newMenu.items,
    sidebarDepth,
  );

  return (
    <>
      <div
        className={`sidebar-container ${styles.sidebar}`}
        id="sidebar-container"
        sx={{ variant: 'divs.sidebar' }}
      >
        <Menu
          activeId={activeId}
          items={newMenu.items}
        >
          {newMenu.sidebarLabel && (
            <div className={`sidebar-header ${styles.header}`}>
              <Styled.a
                as={Link}
                to={newMenu.path}
                className="sidebar-label-link"
                sx={{ variant: 'links.sidebarLabel' }}
              >
                <h2 className="sidebar-label">{newMenu.sidebarLabel}</h2>
              </Styled.a>
            </div>
          )}
        </Menu>
      </div>
      <div
        className={`sidebar-dropdown-container ${styles.dropdown}`}
        sx={{ variant: 'divs.mobileSidebar' }}
      >
        <Dropdown
          className="mobile-sidebar"
          label={newMenu.dropdownLabel}
          themeUI={{ backgroundColor: 'background' }}
        >
          <Menu
            activeId={activeId}
            items={newMenu.items}
          />
        </Dropdown>
      </div>
    </>
  );
}

Menu.propTypes = {
  activeId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  closeDropdown: PropTypes.func,
  items: PropTypes.instanceOf(Object).isRequired,
};

Menu.defaultProps = {
  children: null,
  closeDropdown: () => {},
};
