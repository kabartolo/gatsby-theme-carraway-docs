import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {
  Link,
  navigate,
  useStaticQuery,
  graphql,
} from 'gatsby';

import { useClickOutside } from '../../hooks/useClickOutside';
import { markText, rebuildIndex } from './helpers';

import styles from './search.module.scss';

function SearchResult({ page, query }) {
  const tokens = query.split(' ');
  const title = markText(page.title, tokens);
  const description = page.description && markText(page.description, tokens);

  const primaryMatch = title.length > 1 || (description && description.length > 1);
  const headers = Object.keys(page.headerData)
    .map((header) => ({ marked: markText(header, tokens), url: page.headerData[header] }))
    .filter((header) => header.marked.length > 1);

  return (
    <>
      {primaryMatch
      && (
        <li key={page.id}>
          <div className={styles.resultContainer}>
            <h3><Link to={page.path}>{title}</Link></h3>
            {description && <p>{description}</p>}
          </div>
        </li>
      )}
      {headers.map((header) => (
        <li key={header.url}>
          <div className={styles.resultContainer}>
            <h3>
              <Link to={page.path}>{title}</Link>
              &#58;&#160;
              <Link to={`${page.path}${header.url}`}>{header.marked}</Link>
            </h3>
          </div>
        </li>
      ))}
    </>
  );
}

export default function Search({ location }) {
  const { allPost } = useStaticQuery(
    graphql`
      query {
        allPost {
          nodes {
            id
            title
            description
            path
            parent {
              ... on Mdx {
                tableOfContents
              }
            }
          }
        }
      }
    `,
  );

  const { nodes } = allPost;
  const searchQuery = new URLSearchParams(location.search).get('query') || '';
  const [query, setQuery] = useState(searchQuery);
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(rebuildIndex(nodes));
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef();
  const [focus, setFocus] = useState(false);
  useClickOutside(ref, () => {
    if (focus) {
      setFocus(false);
      setResults([]);
      navigate(`${location.pathname}${location.hash}`, { state: { preventScroll: true } });
    }
  });

  useEffect(() => {
    setQuery(searchQuery);

    if (searchQuery === '') {
      setResults([]);
    } else {
      setIndex(index || rebuildIndex(nodes));
      setResults(index.search(query));
    }
  }, [location.search], query);

  useEffect(() => {
    setIsOpen(!!results.length);
    setFocus(isOpen
      || document.getElementById('search-input') === document.activeElement);
  }, [results, isOpen]);

  const search = (event) => {
    navigate(`?query=${encodeURIComponent(event.target.value)}${location.hash}`);
  };

  return (
    <>
      <div ref={ref} className={styles.wrapper}>
        <form className={styles.searchForm} role="search" method="GET">
          <div className={`${styles.searchGroup} ${focus ? styles.expanded : ''}`}>
            <input
              type="search"
              id="search-input"
              className={`${styles.searchInput} ${focus ? styles.expanded : ''}`}
              name="query"
              value={query}
              placeholder="Search"
              onFocus={() => setFocus(true)}
              onChange={search}
            />
          </div>
        </form>
        {(isOpen || focus)
          && (
            <div className={`${styles.container} ${isOpen || focus ? styles.open : ''}`}>
              <section className={`${styles.searchResults} ${isOpen ? styles.open : ''}`}>
                <ol>
                  {results.map((result) => (
                    <SearchResult page={result} query={query} />
                  ))}
                </ol>
              </section>
            </div>
          )}
      </div>
      <div className={`${styles.searchOverlay} ${isOpen || focus ? styles.open : ''}`} />
    </>
  );
}

Search.propTypes = ({
  location: PropTypes.instanceOf(Object).isRequired,
});

SearchResult.propTypes = {
  page: PropTypes.instanceOf(Object).isRequired,
  query: PropTypes.string.isRequired,
};
