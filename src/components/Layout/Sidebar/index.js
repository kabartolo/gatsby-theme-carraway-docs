/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import getIds from '../../../utils/get-ids';

import Accordion from '../Accordion';
import Dropdown from '../Dropdown';

import {
  useActiveId,
  useDocContext,
  useLocation,
  useTableOfContents,
} from '../../../hooks';

import styles from './sidebar.module.scss';

function Menu({
  activeId,
  children,
  closeDropdown,
  items,
}) {
  return (
    <nav className={`sidebar-scrollable ${styles.scrollable}`}>
      {children}
      <div className={`sidebar-accordion-container ${styles.accordion}`}>
        <Accordion
          activeId={activeId}
          items={items}
          onClickLink={closeDropdown}
        />
      </div>
    </nav>
  );
}

export default function Sidebar() {
  const {
    docId,
    menu,
    showSidebar,
  } = useDocContext();
  const location = useLocation();

  const tableOfContents = useTableOfContents(docId);
  const itemIds = getIds(tableOfContents.nested && tableOfContents.nested.items, 2);
  const activeId = useActiveId(itemIds, docId);

  function checkIfOpen(item, currentId) {
    return item.id === currentId || !!item.items.find((subItem) => subItem.id === currentId);
  }

  if (showSidebar === false || !menu || !menu.items) return null;

  /* eslint-disable no-param-reassign */
  menu.items.forEach((item) => {
    let isOpen;
    if (item.isGroup) {
      isOpen = !!location.pathname.match(new RegExp(`^${item.path}`, 'i'));
      item.items.forEach((subItem) => {
        subItem.isOpen = checkIfOpen(subItem, docId);
      });
    } else {
      isOpen = checkIfOpen(item, docId);
    }

    item.isOpen = isOpen;
  });
  /* eslint-enable no-param-reassign */

  return (
    <>
      <div
        className={`sidebar-container ${styles.sidebar}`}
        id="sidebar-container"
        sx={{ variant: 'divs.sidebar' }}
      >
        <Menu
          activeId={activeId}
          items={menu.items}
        >
          <Styled.a
            as={Link}
            to={menu.path}
            className="sidebar-label-link"
            sx={{ variant: 'links.sidebarLabel' }}
          >
            <h2 className={`sidebar-label-header ${styles.header}`}>{menu.name}</h2>
          </Styled.a>
        </Menu>
      </div>
      <div
        className={`sidebar-dropdown-container ${styles.dropdown}`}
        sx={{ variant: 'divs.mobileSidebar' }}
      >
        <Dropdown
          className="mobile-sidebar"
          label={menu.name}
          themeUI={{ backgroundColor: 'background' }}
        >
          <Menu
            activeId={activeId}
            items={menu.items}
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
