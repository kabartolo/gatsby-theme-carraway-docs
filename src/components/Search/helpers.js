import React from 'react';
import reactStringReplace from 'react-string-replace';
import * as JsSearch from 'js-search';

export const markText = (text, words) => {
  let result = text;
  words.forEach((word) => {
    result = reactStringReplace(result, word, (match) => (
      <mark>{match}</mark>
    ));
  });
  return result;
};

/* eslint-disable no-use-before-define */
const flattenItem = ({ url = '', title = '', items = [] }) => (
  [{ url, title }, ...flattenTOC(items)]
);

const flattenTOC = (items = []) => (
  items.flatMap((item) => flattenItem(item))
);
/* eslint-enable no-use-before-define */

export const rebuildIndex = (nodes) => {
  const doc = nodes.map((node) => {
    const toc = flattenTOC(node.parent.tableOfContents.items);

    return {
      id: node.id,
      title: node.title,
      description: node.description,
      path: node.path,
      headers: toc.map((item) => item.title),
      headerData: toc.reduce((map, item) => ({
        ...map,
        [item.title]: item.url,
      }), {}),
    };
  });

  const data = new JsSearch.Search('id');
  data.sanitizer = new JsSearch.LowerCaseSanitizer();
  data.addIndex(['title']);
  data.addIndex(['description']);
  data.addIndex(['headers']);

  data.addDocuments(doc);
  return data;
};
