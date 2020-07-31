/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export default function Dropdown({
  children,
  label,
  openIcon,
  closeIcon,
  themeUI,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        sx={{ variant: 'buttons.unstyled' }}
      >
        {label !== '' && <span>{label}</span>}
        <span>{isOpen ? closeIcon : openIcon}</span>
      </button>
      {isOpen && (
        <div sx={themeUI}>
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, { closeDropdown });
            }
            return child;
          })}
        </div>
      )}
    </>
  );
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string,
  openIcon: PropTypes.node.isRequired,
  closeIcon: PropTypes.node.isRequired,
  themeUI: PropTypes.instanceOf(Object),
};

Dropdown.defaultProps = {
  label: '',
  themeUI: {},
};
