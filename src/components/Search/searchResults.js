/** @jsx jsx */
/* eslint-disable no-unused-vars, no-return-assign */
import { jsx, Styled } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

import ResultLink from './resultLink';

import useTableOfContents from '../../hooks/useTableOfContents';

import styles from './search.module.scss';

export const EXCERPT_LENGTH = 250;

function markText(text, words) {
  let result = text;
  words.forEach((word) => {
    result = reactStringReplace(result, word, (match, i) => (
      <mark key={i}>{match}</mark>
    ));
  });
  return result;
}

function addEllipses(excerpt) {
  if (!excerpt.length) return null;
  const ellipses = (excerpt.join('').length > EXCERPT_LENGTH) && <span>...</span>;
  return excerpt.concat(ellipses);
}

export default function SearchResults({ results, query, closeDropdown }) {
  const tableOfContents = useTableOfContents();
  const tokens = query.split(' ');
  const primaryResults = [];
  let otherResults = [];

  results.forEach((post) => {
    const {
      id,
      title,
      description,
      path,
      sections,
      headers,
    } = post;
    const { headerFlatMap } = tableOfContents.find((node) => node.id === id);
    const markedTitle = markText(title, tokens);
    const markedDescription = markText(description, tokens);

    const titleMatches = markedTitle.length > 1;
    const descriptionMatches = markedDescription.length > 1;

    if (titleMatches || descriptionMatches) {
      const element = (
        <ResultLink
          title={markedTitle}
          heading={[]}
          excerpt={addEllipses(markedDescription)}
          path={path}
          onClick={closeDropdown}
          key={parseInt(id, 10)}
          id={parseInt(id, 10)}
        />
      );
      primaryResults.push(element);
    }

    headers.forEach((header) => {
      const headerData = headerFlatMap && headerFlatMap.find((data) => data.title === header);
      const slug = headerData ? headerData.url : '';
      const paragraphs = sections.filter((section) => section.heading === header);
      const markedHeader = markText(header, tokens);
      const headerMatches = markedHeader.length > 1;
      const excerpt = paragraphs.length
        ? markText(paragraphs[0].content.slice(0, EXCERPT_LENGTH), tokens)
        : [];

      if (header !== '' && headerMatches) {
        const element = (
          <ResultLink
            title={markedTitle}
            heading={markedHeader}
            excerpt={addEllipses(excerpt)}
            path={`${path}${slug}`}
            onClick={closeDropdown}
            key={paragraphs.id}
            id={paragraphs.id}
          />
        );
        primaryResults.push(element);
      } else if (header === '') {
        const paragraphMatches = paragraphs
          .filter((paragraph) => markText(paragraph.content, tokens).length > 1)
          .map((paragraph) => (
            <ResultLink
              title={markedTitle}
              heading={[]}
              excerpt={addEllipses(markText(paragraph.content.slice(0, EXCERPT_LENGTH), tokens))}
              path={`${path}${slug}`}
              onClick={closeDropdown}
              key={paragraphs.id}
              id={paragraphs.id}
            />
          ));
        otherResults = otherResults.concat(paragraphMatches);
      }
    });
  });

  return (
    <>
      <ol>
        {primaryResults.concat(otherResults)}
      </ol>
    </>
  );
}

SearchResults.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  query: PropTypes.string.isRequired,
  closeDropdown: PropTypes.func,
};

SearchResults.defaultProps = {
  closeDropdown: () => null,
};
