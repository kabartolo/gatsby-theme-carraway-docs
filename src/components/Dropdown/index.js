import React, {
  Children,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import styles from './dropdown.module.scss';

export default function Dropdown({ children, label }) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.layout}>
        <button
          type="button"
          onClick={onClick}
        >
          <span>{label}</span>
          <>
            {!isOpen && (
              <i className="material-icons">expand_more</i>
            )}
            {isOpen && (
              <i className="material-icons">expand_less</i>
            )}
          </>
        </button>
      </div>
      <>
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
      </>
    </>
  );
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};
