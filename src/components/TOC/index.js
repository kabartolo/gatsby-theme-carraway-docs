/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { getIds } from '../../utils/helpers';
import styles from './toc.module.scss';

import { useActiveId } from '../../hooks';

function NestedList({
  items,
  count,
  depth,
  activeId,
}) {
  return (
    <ol>
      {items.map((item) => (
        <li key={item.url}>
          <Link to={item.url} className={(item.url === `#${activeId}`) ? 'active' : ''}>
            {item.title}
          </Link>
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
    >
      <nav
        className={styles.scroll}
        sx={{ variant: 'navs.toc' }}
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
