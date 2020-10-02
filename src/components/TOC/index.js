/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { getIds } from '../../utils/helpers';

import { useActiveId } from '../../hooks';

import styles from './toc.module.scss';

function NestedList({
  items,
  count,
  depth,
  activeId,
}) {
  return (
    <ol>
      {items.map((item) => (
        <li
          key={item.url}
          sx={{ variant: 'listItems.toc' }}
        >
          <Styled.a
            as={Link}
            to={item.url}
            className={(item.url === `#${activeId}`) ? 'activeHeader' : ''}
            sx={{ variant: 'links.toc' }}
          >
            {item.title}
          </Styled.a>
          {(count <= depth && item.items) && (
            <NestedList
              items={item.items}
              count={count + 1}
              depth={depth}
              activeId={activeId}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function TOC({
  contents,
  depth,
  title,
  className,
}) {
  const tableOfContents = contents;
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
        className={styles.scroll}
      >
        <h2>{title}</h2>
        <NestedList
          items={tableOfContents.items}
          count={0}
          depth={depth}
          activeId={activeId}
        />
      </nav>
    </div>
  );
}

TOC.propTypes = {
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
  className: PropTypes.string,
};

TOC.defaultProps = {
  contents: null,
  depth: 2,
  title: 'Table of Contents',
  className: '',
};

NestedList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  count: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  activeId: PropTypes.string.isRequired,
};
