/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
/* eslint-enable no-unused-vars */
  cloneElement,
  Children,
  isValidElement,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { useClickOutside } from '../../../hooks';

import styles from './dropdown.module.scss';

export default function Dropdown({
  children,
  closeIcon,
  openIcon,
  label,
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
    <div ref={ref} className={`dropdown-container ${styles.dropdown}`}>
      <button
        type="button"
        onClick={onClick}
        className={`dropdown-button ${styles.button}`}
        sx={{ variant: 'buttons.dropdown' }}
      >
        {label !== '' && <span className="dropdown-label">{label}</span>}
        <span>{isOpen ? close : open}</span>
      </button>
      {isOpen && (
        <div
          className="dropdown-content"
          sx={themeUI}
        >
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
  closeIcon: PropTypes.node,
  openIcon: PropTypes.node,
  label: PropTypes.string,
  themeUI: PropTypes.instanceOf(Object),
};

Dropdown.defaultProps = {
  closeIcon: null,
  openIcon: null,
  label: '',
  themeUI: {},
};
