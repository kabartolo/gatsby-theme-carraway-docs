/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';

function getIds(items, depth) {
  if (!items) return [];
  let currentDepth = 2; // table of contents starts at depth 2

  return items.reduce((list, item) => {
    if (item.url) {
      list.push(item.url.slice(1));
    }
    if (item.items && currentDepth < depth) {
      list.push(...getIds(item.items));
      currentDepth += 1;
    }
    return list;
  }, []);
}

/* Depth refers to the h1, h2, ..., h6 headers on the page */
export const useActiveId = (tableOfContents, depth = 6) => {
  const [activeId, setActiveId] = useState('');

  const itemIds = getIds(tableOfContents && tableOfContents.items, depth);
  const elements = itemIds.map((id) => document.getElementById(id));

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: '0% 0% -80% 0%' });

    elements.forEach((el) => {
      el && observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        el && observer.unobserve(el);
      });
    };
  }, [itemIds]);
  return activeId;
};
