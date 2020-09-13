/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Index } from 'elasticlunr';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
  useClickOutside,
  useEscape,
  useLocation,
  useSearchIndex,
} from '../../hooks';

import styles from './search.module.scss';

import SearchResults from './searchResults';

export default function Search({ closeDropdown }) {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  const searchIndexData = useSearchIndex();
  const [query, setQuery] = useState(searchQuery);
  const [index, setIndex] = useState(Index.load(searchIndexData));
  const [results, setResults] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const clickOutsideRef = useRef();
  const escapeRef = useRef();

  function clearSearch() {
    navigate(`${location.pathname}${location.hash}`, { state: { preventScroll: true } });
  }

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

  useClickOutside(clickOutsideRef, () => setFocus(false));

  useEscape(escapeRef, () => {
    setFocus(false);
    blurInput();
  });

  useEffect(() => {
    setQuery(searchQuery);

    if (searchQuery === '') {
      setResults([]);
    } else {
      const newResults = index
        .search(searchQuery, {})
        .map(({ ref }) => index.documentStore.getDoc(ref));
      setResults(newResults);
    }
  }, [location.search]);

  useEffect(() => {
    setIsOpen(!!results.length);
    setFocus(!!results.length
    || document.getElementById('search-input') === document.activeElement);
  }, [results, isOpen]);

  const search = (event) => {
    navigate(`?query=${encodeURIComponent(event.target.value)}${location.hash}`);
  };

  return (
    <>
      <div ref={clickOutsideRef} className={styles.wrapper}>
        <form className={styles.searchForm} role="search" method="GET">
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
              onChange={search}
              sx={{ variant: 'inputs.searchbar' }}
              className={`searchbar ${styles.searchInput} ${focus ? styles.expanded : ''}`}
            />
            {query
            && (
              <button
                type="button"
                sx={{ variant: 'buttons.unstyled' }}
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
        </form>
        {focus && (
          <div
            sx={{ variant: 'divs.resultContainer' }}
            className={`${styles.container} ${isOpen || focus ? styles.open : ''}`}
          >
            {!!results.length && query.length > 2 && (
              <section className={`${styles.searchResults} ${isOpen ? styles.open : ''}`}>
                <SearchResults results={results} query={query} closeDropdown={closeDropdown} />
              </section>
            )}
          </div>
        )}
      </div>
      <div className={`${styles.searchOverlay} ${focus ? styles.open : ''}`} />
    </>
  );
}

Search.propTypes = {
  closeDropdown: PropTypes.func,
};

Search.defaultProps = {
  closeDropdown: () => null,
};
