/** @jsx jsx */
/* eslint-disable no-unused-vars, no-param-reassign */
import { jsx } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import styles from './sidebar.module.scss';

import Accordion from '../Accordion';
import Dropdown from '../Dropdown';

import { useActiveId } from '../../hooks/useActiveId';
import useLocation from '../../hooks/useLocation';
import usePostContext from '../../hooks/usePostContext';
import useThemeOptions from '../../hooks/useThemeOptions';
import useSidebar from '../../hooks/useSidebar';
import useTableOfContents from '../../hooks/useTableOfContents';

/* Icons for main dropdown menu on mobile */
const chevronUp = <FontAwesomeIcon icon={faChevronUp} />;
const chevronDown = <FontAwesomeIcon icon={faChevronDown} />;

function Menu({
  children,
  closeDropdown,
  allowMultipleOpen,
  items,
  activeId,
}) {
  return (
    <nav className={styles.scrollable} sx={{ variant: 'navs.accordion' }}>
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

export default function Sidebar() {
  const location = useLocation();
  const { postID } = usePostContext();
  const { sidebarAllowTOC, sidebarAllowMultipleOpen } = useThemeOptions();
  const allTableOfContents = useTableOfContents();
  const currentTableOfContents = useTableOfContents(postID);
  const activeId = useActiveId(currentTableOfContents.nested, 2);
  const [_, basePath, slug] = location.pathname.split('/');
  const menu = useSidebar(basePath);

  if (!menu || !menu.items) return null;

  function getTOC(item, allTOC) {
    const TOC = allTOC.find((tableOfContents) => (
      tableOfContents.id === item.id
    ));
    if (!TOC || !TOC.nested.items) return null;
    return TOC.nested.items.map((heading) => ({
      id: heading.url,
      name: heading.title,
      type: heading.url,
      path: `${item.path}${heading.url}`,
    }));
  }

  menu.items.forEach((item) => {
    if (sidebarAllowTOC) {
      if (item.items && item.items.length) {
        item.items.forEach((subItem) => {
          subItem.items = getTOC(subItem, allTableOfContents);
        });
      } else {
        item.items = getTOC(item, allTableOfContents);
      }
    }
    item.isOpen = item.id === postID
    || (item.items && item.items.find((subItem) => subItem.id === postID));
  });

  return (
    <>
      <div id="sidebar-container" sx={{ variant: 'divs.sidebar' }} className={styles.sidebar}>
        <Menu
          allowMultipleOpen={sidebarAllowMultipleOpen}
          items={menu.items}
          activeId={activeId}
        >
          <h2>{menu.name}</h2>
        </Menu>
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          label={menu.name}
          openIcon={chevronDown}
          closeIcon={chevronUp}
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
