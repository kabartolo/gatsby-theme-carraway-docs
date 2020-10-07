/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React, { useEffect, useRef } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { useEscape, useClickOutside } from '../../hooks';

import styles from './search.module.scss';

export default function SearchInput({
  clickOutsideRef,
  focus,
  setFocus,
  query,
  setQuery,
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
  }, [query, setFocus]);

  return (
    <div
      className={`search-input-group ${styles.searchGroup} ${focus ? styles.expanded : ''}`}
    >
      <FontAwesomeIcon
        icon={faSearch}
        className={`search-icon ${styles.searchIcon}`}
        sx={{ variant: 'icons.search' }}
      />
      <input
        id="search-input"
        name="query"
        onFocus={() => setFocus(true)}
        onChange={handleChange}
        placeholder="Search"
        ref={escapeRef}
        type="search"
        value={query}
        className={`searchbar ${styles.searchInput} ${focus ? styles.expanded : ''}`}
        sx={{ variant: 'inputs.searchbar' }}
      />
      {query && (
        <button
          onClick={() => {
            clearSearch();
            if (focus) focusInput();
          }}
          type="button"
          className={`search-close-button ${styles.button}`}
          sx={{ variant: 'buttons.clearSearch' }}
        >
          <FontAwesomeIcon
            className={`search-close-icon ${styles.closeIcon}`}
            icon={faTimesCircle}
            sx={{ variant: 'icons.clearSearch' }}
          />
        </button>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  clickOutsideRef: PropTypes.instanceOf(Object).isRequired,
  focus: PropTypes.bool,
  setFocus: PropTypes.func.isRequired,
  query: PropTypes.string,
  setQuery: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
  focus: false,
  query: '',
};
