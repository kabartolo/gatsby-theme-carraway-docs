/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import getIds from '../../utils/get-ids';

import {
  useActiveId,
  useDocContext,
  useTableOfContents,
  useLocation,
} from '../../hooks';

import styles from './toc.module.scss';

const MAX_DEPTH = 6;

function NestedList({
  activeId,
  count,
  depth,
  items,
}) {
  const uid = useUID();
  return (
    <ol className="toc-nested-list">
      {items.map((item) => (
        <li
          key={`${uid}-${item.url}`}
          className="toc-nested-list-item"
          sx={{ variant: 'listItems.layout' }}
        >
          <Styled.a
            href={item.url}
            className={`toc-nested-link ${(item.url === `#${activeId}`) ? 'activeHeader' : ''}`}
            sx={{
              variant: 'links.hover',
              color: 'mediumGray',
              '&.activeHeader': {
                color: 'secondary',
              },
            }}
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
  const { pathname } = useLocation();
  const storedTOC = useTableOfContents({ depth, docId, path: pathname });
  const tableOfContents = contents || storedTOC.nested;

  const hasTOC = tableOfContents && !!tableOfContents.items;
  const itemIds = getIds(hasTOC && tableOfContents.items, depth);
  const activeId = useActiveId(itemIds, '');

  if (!hasTOC) return null;
  return (
    <div
      className={`toc-container ${className}`}
      id="toc-container"
      sx={{
        border: 'main',
        borderColor: 'border',
        boxShadow: 'main',
      }}
    >
      <nav
        className={`toc-scroll ${styles.scroll}`}
      >
        {title && <h2 className="toc-title">{title}</h2>}
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
  depth: PropTypes.oneOf([2, 3, 4, 5, 6]),
  title: PropTypes.string,
};

TOC.defaultProps = {
  className: '',
  contents: null,
  depth: MAX_DEPTH,
  title: '',
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
