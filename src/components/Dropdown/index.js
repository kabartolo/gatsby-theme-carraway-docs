/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useClickOutside } from '../../hooks/useClickOutside';

export default function Dropdown({
  children,
  label,
  openIcon,
  closeIcon,
  themeUI,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const close = closeIcon || <FontAwesomeIcon icon={faChevronUp} />;
  const open = openIcon || <FontAwesomeIcon icon={faChevronDown} />;

  function onClick() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useClickOutside(ref, () => {
    closeDropdown();
  });

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={onClick}
        sx={{ variant: 'buttons.unstyled' }}
      >
        {label !== '' && <span>{label}</span>}
        <span>{isOpen ? close : open}</span>
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
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  openIcon: PropTypes.node,
  closeIcon: PropTypes.node,
  label: PropTypes.string,
  themeUI: PropTypes.instanceOf(Object),
};

Dropdown.defaultProps = {
  label: '',
  themeUI: {},
  openIcon: null,
  closeIcon: null,
};
