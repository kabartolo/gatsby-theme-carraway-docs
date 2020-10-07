/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import getIds from '../../utils/get-ids';

import { useActiveId, useDocContext, useTableOfContents } from '../../hooks';

import styles from './toc.module.scss';

function NestedList({
  activeId,
  count,
  depth,
  items,
}) {
  return (
    <ol className="toc-nested-list">
      {items.map((item) => (
        <li
          key={item.url}
          className="toc-nested-list-item"
          sx={{ variant: 'listItems.toc' }}
        >
          <Styled.a
            as={Link}
            to={item.url}
            className={`toc-nested-link ${(item.url === `#${activeId}`) ? 'activeHeader' : ''}`}
            sx={{ variant: 'links.toc' }}
          >
            {item.title}
          </Styled.a>
          {(count <= depth && item.items) && (
            <NestedList
              activeId={activeId}
              count={count + 1}
              depth={depth}
              items={item.items}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function TOC({
  className,
  contents,
  depth,
  title,
}) {
  const { docId } = useDocContext();
  const storedTOC = useTableOfContents(docId);
  const tableOfContents = contents || storedTOC.nested;
  const itemIds = getIds(tableOfContents.items, 6);
  const activeId = useActiveId(itemIds, '');

  if (!tableOfContents || !tableOfContents.items) return null;

  return (
    <div
      className={`toc-container ${className}`}
      id="toc-container"
      sx={{ variant: 'divs.toc' }}
    >
      <nav
        className={`toc-scroll ${styles.scroll}`}
      >
        <h2 className="toc-title">{title}</h2>
        <NestedList
          activeId={activeId}
          count={0}
          depth={depth}
          items={tableOfContents.items}
        />
      </nav>
    </div>
  );
}

TOC.propTypes = {
  className: PropTypes.string,
  contents: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
  }),
  depth: PropTypes.number,
  title: PropTypes.string,
};

TOC.defaultProps = {
  className: '',
  contents: null,
  depth: 2,
  title: 'Table of Contents',
};

NestedList.propTypes = {
  activeId: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
