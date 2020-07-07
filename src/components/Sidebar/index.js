import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './sidebar.module.scss';
import Accordion from '../Accordion';

import useSidebar from '../../hooks/useSidebar';

export default function Sidebar({
  children,
  menus,
  allowMultipleOpen,
  allowTOC,
  closeDropdown,
}) {
  const data = useSidebar(menus);
  const isPost = data && data.posts;

  return (
    <div className={styles.container}>
      {children}
      {(menus.length > 1)
        && (
        <ul>
          {menus.map((menu) => <li><Link to={`/${menu.type}`}>{menu.name}</Link></li>)}
        </ul>
        )}
      {isPost && (
        <div className={styles.accordion}>
          <Accordion
            allowMultipleOpen={allowMultipleOpen}
            allowTOC={allowTOC}
            items={data.posts}
            onClickLink={closeDropdown}
          />
        </div>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  menus: PropTypes.instanceOf(Array).isRequired,
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func,
};

Sidebar.defaultProps = {
  closeDropdown: () => {},
};
