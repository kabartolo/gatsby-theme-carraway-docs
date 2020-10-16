/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Index } from 'elasticlunr';

import SearchInput from './search-input';
import SearchResults from './search-results';

import { useDocsSearch } from '../../hooks/useDocsSearch';

import styles from './search.module.scss';

export default function Search({ closeDropdown }) {
  const { index } = useDocsSearch();
  const searchIndex = useMemo(() => Index.load(index), [index]);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [focus, setFocus] = useState(false);

  const clickOutsideRef = useRef();

  useEffect(() => {
    if (query === '') {
      setResults([]);
    } else {
      const newResults = searchIndex
        .search(query, {
          fields: {
            title: { boost: 3 },
            description: { boost: 2 },
            headers: { boost: 2 },
            paragraphs: { boost: 1 },
          },
        }).map(({ ref }) => searchIndex.documentStore.getDoc(ref));
      setResults(newResults);
      setFocus(true); // ensures results show on mobile
    }
  }, [query, searchIndex]);

  if (!index) return null;

  return (
    <>
      <div ref={clickOutsideRef} className={`search-container ${styles.searchContainer}`}>
        <form className={`search-form ${styles.searchForm}`} role="search" method="GET">
          <SearchInput
            clickOutsideRef={clickOutsideRef}
            focus={focus}
            setFocus={setFocus}
            query={query}
            setQuery={setQuery}
          />
        </form>
        {focus && (
          <SearchResults
            closeDropdown={closeDropdown}
            focus={focus}
            query={query}
            results={results}
          />
        )}
      </div>
      <div id="search-overlay" className={`search-overlay ${styles.searchOverlay}`} />
    </>
  );
}

Search.propTypes = {
  closeDropdown: PropTypes.func,
};

Search.defaultProps = {
  closeDropdown: () => null,
};
