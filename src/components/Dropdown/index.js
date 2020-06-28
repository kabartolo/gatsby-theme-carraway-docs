import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import styles from './dropdown.module.css';

export default function Dropdown({ children, label }) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
      >
        <span>{label}</span>
        <span>
          {!isOpen && (
            <span>
              <i className="material-icons">expand_more</i>
            </span>
          )}
          {isOpen && (
            <span>
              <i className="material-icons">expand_less</i>
            </span>
          )}
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
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
  label: PropTypes.string.isRequired,
};
