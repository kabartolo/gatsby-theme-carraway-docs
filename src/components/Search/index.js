/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx, Styled } from 'theme-ui';
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Index } from 'elasticlunr';

import { useSearchIndex } from '../../hooks';

import styles from './search.module.scss';

import SearchInput from './searchInput';
import SearchResults from './searchResults';

export default function Search({ closeDropdown }) {
  const searchIndexData = useSearchIndex();
  const searchIndex = useMemo(() => Index.load(searchIndexData), [searchIndexData]);

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
    }
  }, [query]);

  if (!searchIndexData) return null;

  return (
    <>
      <div ref={clickOutsideRef} className={styles.wrapper}>
        <form className={styles.searchForm} role="search" method="GET">
          <SearchInput
            clickOutsideRef={clickOutsideRef}
            query={query}
            setQuery={setQuery}
            focus={focus}
            setFocus={setFocus}
          />
        </form>
        {focus && (
          <SearchResults
            results={results}
            query={query}
            focus={focus}
            closeDropdown={closeDropdown}
          />
        )}
      </div>
      <div id="search-overlay" className={styles.searchOverlay} />
    </>
  );
}

Search.propTypes = {
  closeDropdown: PropTypes.func,
};

Search.defaultProps = {
  closeDropdown: () => null,
};
