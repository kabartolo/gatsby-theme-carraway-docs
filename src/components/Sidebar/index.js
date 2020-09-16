/** @jsx jsx */
/* eslint-disable no-unused-vars, no-param-reassign */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { getIds } from '../../utils/helpers';
import styles from './sidebar.module.scss';

import Accordion from '../Accordion';
import Dropdown from '../Dropdown';

import {
  useActiveId,
  useLocation,
  usePostContext,
  useTableOfContents,
  useThemeOptions,
} from '../../hooks';

function Menu({
  children,
  closeDropdown,
  allowMultipleOpen,
  items,
  activeId,
}) {
  return (
    <nav className={styles.scrollable}>
      {children}
      <div className={styles.accordion}>
        <Accordion
          allowMultipleOpen={allowMultipleOpen}
          items={items}
          onClickLink={closeDropdown}
          activeId={activeId}
        />
      </div>
    </nav>
  );
}

function checkIfOpen(item, currentId) {
  return item.id === currentId || !!item.items.find((subItem) => subItem.id === currentId);
}

function findPost(menu, id) {
  return menu.items
    ? (menu.items.find((item) => item.id === id) || findPost(menu.items, id))
    : null;
}

export default function Sidebar() {
  const { menu, postId, showSidebar } = usePostContext();
  const location = useLocation();
  const { sidebarAllowMultipleOpen } = useThemeOptions();

  const tableOfContents = useTableOfContents(postId);
  const itemIds = getIds(tableOfContents.nested && tableOfContents.nested.items, 2);
  const activeId = useActiveId(itemIds, postId);

  if (showSidebar === false || !menu || !menu.items) return null;

  menu.items.forEach((item) => {
    let isOpen;
    if (item.isGroup) {
      isOpen = !!location.pathname.match(new RegExp(`^${item.path}`, 'i'));
      item.items.forEach((subItem) => {
        subItem.isOpen = checkIfOpen(subItem, postId);
      });
    } else {
      isOpen = checkIfOpen(item, postId);
    }

    item.isOpen = isOpen;
  });

  return (
    <>
      <div id="sidebar-container" sx={{ variant: 'divs.sidebar' }} className={styles.sidebar}>
        <Menu
          allowMultipleOpen={sidebarAllowMultipleOpen}
          items={menu.items}
          activeId={activeId}
        >
          <Styled.a
            as={Link}
            to={menu.path}
            sx={{ variant: 'links.sidebarLabel' }}
          >
            <h2>{menu.name}</h2>
          </Styled.a>
        </Menu>
      </div>
      <div sx={{ variant: 'divs.mobileSidebar' }} className={styles.dropdown}>
        <Dropdown
          label={menu.name}
          themeUI={{ backgroundColor: 'background' }}
        >
          <Menu
            allowMultipleOpen={sidebarAllowMultipleOpen}
            items={menu.items}
            activeId={activeId}
          />
        </Dropdown>
      </div>
    </>
  );
}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  closeDropdown: PropTypes.func,
  allowMultipleOpen: PropTypes.bool,
  items: PropTypes.instanceOf(Object).isRequired,
  activeId: PropTypes.string.isRequired,
};

Menu.defaultProps = {
  children: null,
  closeDropdown: () => {},
  allowMultipleOpen: true,
};
