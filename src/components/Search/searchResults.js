/** @jsx jsx */
/* eslint-disable no-unused-vars, no-return-assign */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

import ResultLink from './resultLink';

import withDefault from '../../utils/with-default';

import { useTableOfContents, useThemeOptions } from '../../hooks';

import styles from './search.module.scss';

export const EXCERPT_LENGTH = 250;

function markText(text, words) {
  return reactStringReplace(text, words, (match, i) => (
    <mark key={i}>{match}</mark>
  ));
}

function addEllipses(excerpt) {
  if (!excerpt.length) return [];
  const ellipses = (excerpt.join('').length > EXCERPT_LENGTH) && '...';
  return excerpt.concat(ellipses);
}

export default function SearchResults({
  results,
  query,
  closeDropdown,
}) {
  const tableOfContents = useTableOfContents();
  const { primaryResultsOnly } = withDefault(useThemeOptions());
  const primaryResults = [];
  let otherResults = [];

  /* Each result is a full post */
  results.forEach((post) => {
    const {
      id,
      title,
      description,
      path,
      sections,
      headers,
    } = post;
    const { flatMap } = tableOfContents.find((node) => node.id === id);
    const markedTitle = markText(title, query);
    const markedDescription = markText(description, query);
    const titleMatches = markedTitle.length > 1;
    const descriptionMatches = markedDescription.length > 1;
    const hasPrimaryResult = titleMatches || descriptionMatches;

    if (hasPrimaryResult) {
      const element = (
        <ResultLink
          title={markedTitle}
          heading={[]}
          excerpt={addEllipses(markedDescription)}
          path={path}
          onClick={closeDropdown}
          key={id}
        />
      );
      primaryResults.push(element);
    }

    const headerMatches = headers.map((header) => {
      const paragraphs = sections.filter((section) => section.heading === header);
      const paragraphMatch = paragraphs.find((para) => markText(para.content, query).length > 1);
      const markedHeader = markText(header, query);
      const headerData = flatMap && flatMap.find((data) => data.title === header);
      const slug = headerData ? headerData.url : '';
      return ({
        original: header,
        paragraphs,
        paragraphMatch,
        markedHeader,
        slug,
      });
    }).filter(({
      markedHeader,
      paragraphMatch,
    }) => markedHeader.length > 1 || (!primaryResultsOnly && paragraphMatch));

    headerMatches.forEach((header) => {
      const {
        original,
        paragraphs,
        paragraphMatch,
        markedHeader,
        slug,
      } = header;
      if (original !== '') {
        const excerpt = (!primaryResultsOnly && paragraphMatch)
          ? markText(paragraphMatch.content.slice(0, EXCERPT_LENGTH), query)
          : '';
        const element = (
          <ResultLink
            title={markedTitle}
            heading={markedHeader.length > 1 ? markedHeader : [original]}
            excerpt={addEllipses(excerpt)}
            path={path.replace(/\/$/, slug)}
            onClick={closeDropdown}
            key={paragraphMatch ? paragraphMatch.id : slug}
          />
        );

        primaryResults.push(element);
      } else if (!primaryResultsOnly && !hasPrimaryResult) {
        const paragraphMatches = paragraphs
          .filter((para) => markText(para.content, query).length > 1)
          .map((para) => (
            <ResultLink
              title={markedTitle}
              heading={[]}
              excerpt={addEllipses(markText(para.content.slice(0, EXCERPT_LENGTH), query))}
              path={`${path}${slug}`}
              onClick={closeDropdown}
              key={para.id}
            />
          ));
        otherResults = otherResults.concat(paragraphMatches);
      }
    });
  });

  const newResults = primaryResults.concat(otherResults);

  return (
    <div
      sx={{ variant: 'divs.resultContainer' }}
      className={`${styles.container} ${styles.open}`}
    >
      {newResults.length && query.length > 2 && (
        <section className={`${styles.searchResults} ${results.length ? styles.open : ''}`}>
          <ol>
            {newResults}
          </ol>
        </section>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Array),
  query: PropTypes.string,
  closeDropdown: PropTypes.func,
};

SearchResults.defaultProps = {
  results: [],
  query: '',
  closeDropdown: () => null,
};
