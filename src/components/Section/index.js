import React, {
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './section.module.scss';

export default function Section({ children }) {
  const uid = useUID();
  const { height, width } = useWindowDimensions();
  const blockMargin = 12;

  function getBlocks() {
    const container = document.getElementById(`block-container-${uid}`);
    if (!container) return null;
    return Array.from(container.children);
  }

  function updateBlockHeight() {
    const rightColumnBlocks = getBlocks();
    if (!rightColumnBlocks) return;

    /* eslint-disable no-param-reassign */
    const totalBlockHeights = rightColumnBlocks.reduce((sum, block) => (
      sum + block.offsetHeight + blockMargin
    ), 0);

    const parent = document.getElementById(`right-column-${uid}`);
    const padding = parseInt(window.getComputedStyle(parent).paddingTop, 10);
    const numBlocks = rightColumnBlocks.length;

    const areaHeight = height - (padding * 2) + blockMargin;
    const blockHeight = areaHeight / numBlocks;

    if (totalBlockHeights <= areaHeight) return;

    rightColumnBlocks.forEach((block) => {
      block.style.marginBottom = `${blockMargin}px`;
      block.style.maxHeight = `${blockHeight - blockMargin}px`;
    });
    /* eslint-enable no-param-reassign */
  }

  useEffect(() => {
    if (width >= 850) updateBlockHeight();
  });

  if (width < 850) {
    return (
      <div>
        {children}
      </div>
    );
  }

  let leftColumn = [];
  let rightColumn = [];
  let leftComplete = false;
  Children.toArray(children).forEach((child) => {
    if (child.props.mdxType === 'hr') {
      leftComplete = true;
      return;
    }

    leftComplete
      ? rightColumn = rightColumn.concat(child)
      : leftColumn = leftColumn.concat(child);
  });

  return (
    <section id={`section-${uid}`} className={styles.section}>
      <div id={`left-column-${uid}`} className={styles.leftColumn}>
        {leftColumn}
      </div>
      <div id={`right-column-${uid}`} className={styles.rightColumn}>
        <div id={`block-container-${uid}`} className={styles.blocks}>
          {Children.map(rightColumn, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, { updateBlockHeight });
            }
            return child;
          })}
        </div>
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
