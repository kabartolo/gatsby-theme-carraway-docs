import React from 'react';
import PropTypes from 'prop-types';

import styles from './sidebar.module.scss';
import Accordion from '../Accordion';

import useSidebar from '../../hooks/useSidebar';

export default function Sidebar({
  menus,
  location,
  options,
  closeDropdown,
}) {
  const data = useSidebar(menus);
  const isPost = data && data.items;

  return (
    <div className={styles.container}>
      <nav className={styles.scrollable}>
        {isPost && (
          <div className={styles.accordion}>
            <Accordion
              allowMultipleOpen={options.allowMultipleOpen}
              allowTOC={options.allowTOC}
              items={data.items}
              onClickLink={closeDropdown}
              location={location}
            />
          </div>
        )}
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.instanceOf(Array).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  closeDropdown: PropTypes.func,
};

Sidebar.defaultProps = {
  closeDropdown: () => {},
};
