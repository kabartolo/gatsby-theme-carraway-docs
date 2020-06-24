import React from 'react';
import PropTypes from 'prop-types';

import Accordion from '../Accordion';

import useSidebar from '../../hooks/useSidebar';

export default function Sidebar({ menus, allowMultipleOpen, allowTOC }) {
  const list = useSidebar(menus);

  if (!list) return null;

  return (
    <div className="sidebar">
      <Accordion allowMultipleOpen={allowMultipleOpen} allowTOC={allowTOC}>
        {list}
      </Accordion>
    </div>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.instanceOf(Object).isRequired,
  allowMultipleOpen: PropTypes.bool.isRequired,
  allowTOC: PropTypes.bool.isRequired,
};
