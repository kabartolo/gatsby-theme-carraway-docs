/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React, { useEffect, useRef } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './search.module.scss';
import { useEscape, useClickOutside } from '../../hooks';

export default function SearchInput({
  clickOutsideRef,
  query,
  setQuery,
  focus,
  setFocus,
}) {
  const escapeRef = useRef();

  function blurInput() {
    const inputs = document.getElementsByClassName('searchbar');
    Array.from(inputs)
      .find((el) => el.offsetHeight > 0 && el.offsetWidth > 0)
      .blur();
  }

  function focusInput() {
    const inputs = document.getElementsByClassName('searchbar');
    Array.from(inputs)
      .find((el) => el.offsetHeight > 0 && el.offsetWidth > 0)
      .focus();
  }

  function clearSearch() {
    setQuery('');
  }

  function handleChange(event) {
    setQuery(event.target.value);
  }

  useClickOutside(clickOutsideRef, () => setFocus(false));

  useEscape(escapeRef, () => {
    setFocus(false);
    blurInput();
  });

  useEffect(() => {
    const overlay = document.getElementById('search-overlay');
    focus ? overlay.classList.add(styles.open) : overlay.classList.remove(styles.open);
  }, [focus]);

  useEffect(() => {
    setFocus(document.getElementById('search-input') === document.activeElement);
  }, [query]);

  return (
    <div className={`${styles.searchGroup} ${focus ? styles.expanded : ''}`}>
      <FontAwesomeIcon
        icon={faSearch}
        className={styles.searchIcon}
        sx={{ variant: 'icons.search' }}
      />
      <input
        type="search"
        ref={escapeRef}
        id="search-input"
        name="query"
        value={query}
        placeholder="Search"
        onFocus={() => setFocus(true)}
        onChange={handleChange}
        sx={{ variant: 'inputs.searchbar' }}
        className={`searchbar ${styles.searchInput} ${focus ? styles.expanded : ''}`}
      />
      {query && (
        <button
          type="button"
          className={styles.button}
          sx={{ variant: 'buttons.searchIcon' }}
          onClick={() => {
            clearSearch();
            if (focus) focusInput();
          }}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={styles.closeIcon}
            sx={{ variant: 'icons.clearSearch' }}
          />
        </button>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  setFocus: PropTypes.func.isRequired,
  clickOutsideRef: PropTypes.instanceOf(Object).isRequired,
};

SearchInput.defaultProps = {
  query: '',
  focus: false,
};
