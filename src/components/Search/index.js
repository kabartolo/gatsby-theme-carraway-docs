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
import { graphql, useStaticQuery } from 'gatsby';

import SearchInput from './search-input';
import SearchResults from './search-results';

import styles from './search.module.scss';

/* Ensure `allowSiteSearch` is `true` in the `gatsby-theme-carraway-docs` theme options
    before using this component */
export default function Search({ closeDropdown }) {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `);
  const searchIndexData = siteSearchIndex.index;
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
      setFocus(true); // ensures results show on mobile
    }
  }, [query, searchIndex]);

  if (!searchIndexData) return null;

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
