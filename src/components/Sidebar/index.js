import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.module.css';
import Accordion from '../Accordion';

import useSidebar from '../../hooks/useSidebar';

export default function Sidebar({
  menus,
  allowMultipleOpen,
  allowTOC,
  closeDropdown,
}) {
  const data = useSidebar(menus);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Accordion
        allowMultipleOpen={allowMultipleOpen}
        allowTOC={allowTOC}
        items={data.posts}
        onClickLink={closeDropdown}
      />
    </div>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.instanceOf(Object).isRequired,
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
  closeDropdown: PropTypes.func,
};

Sidebar.defaultProps = {
  closeDropdown: () => {},
};
