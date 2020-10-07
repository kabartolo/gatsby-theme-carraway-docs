/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
} from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import { useWindowDimensions } from '../../hooks';

import styles from './section.module.scss';

const SECTION_BREAKPOINT = 1350;
const { sectionCodeBlockMargin } = styles;

export default function Section({ children }) {
  const uid = useUID();
  let height;
  let width;
  const dimensions = useWindowDimensions();
  if (dimensions) {
    height = dimensions.height;
    width = dimensions.width;
  }
  const sectionRef = useRef();

  function getBlocks() {
    const container = document.getElementById(`block-container-${uid}`);
    if (!container) return null;
    return Array.from(container.children);
  }

  /* Adjust height of elements in right column */
  function updateBlockHeight() {
    const rightColumnBlocks = getBlocks();
    if (!rightColumnBlocks) return;

    /* eslint-disable no-param-reassign */
    const totalBlockHeight = rightColumnBlocks.reduce((sum, block) => (
      sum + block.offsetHeight
    ), 0);
    const rightColumn = document.getElementById(`right-column-${uid}`);
    const padding = parseInt(window.getComputedStyle(rightColumn).paddingTop, 10);
    const numBlocks = rightColumnBlocks.length;

    const screenHeight = height - padding;
    const areaHeight = screenHeight - ((numBlocks + 1) * sectionCodeBlockMargin);
    if (totalBlockHeight <= areaHeight) return;

    const blockHeight = areaHeight / numBlocks;
    rightColumnBlocks.forEach((block) => {
      const maxHeight = `${blockHeight - sectionCodeBlockMargin}px`;
      block.style.marginBottom = `${sectionCodeBlockMargin}px`;
      block.tagName === 'PRE'
        ? block.style.maxHeight = maxHeight
        : block.querySelector('PRE').style.maxHeight = maxHeight;
    });
    /* eslint-enable no-param-reassign */
  }

  let leftColumn = [];
  let rightColumn = [];
  let leftComplete = false;
  Children.toArray(children).forEach((child) => {
    if (child.props && child.props.mdxType === 'hr') {
      leftComplete = true;
      return;
    }

    leftComplete
      ? rightColumn = rightColumn.concat(child)
      : leftColumn = leftColumn.concat(child);
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (width >= SECTION_BREAKPOINT) updateBlockHeight();
  }, [width]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const divideColumns = width > SECTION_BREAKPOINT && rightColumn.length;

  const columnClass = divideColumns ? styles.twoColumns : styles.oneColumn;
  const leftColumnClass = divideColumns ? `section-left-column ${styles.leftColumn}` : '';
  const rightColumnClass = divideColumns ? `section-right-column ${styles.rightColumn}` : '';
  return (
    <section
      ref={sectionRef}
      className={`section-container ${columnClass}`}
      sx={{ variant: 'divs.section' }}
    >
      <div
        id={`left-column-${uid}`}
        className={leftColumnClass}
      >
        {leftColumn}
      </div>
      <div
        id={`right-column-${uid}`}
        className={rightColumnClass}
      >
        <div
          id={`block-container-${uid}`}
          className={`block-container ${styles.blocks}`}
        >
          {Children.map(rightColumn, (child) => {
            if (isValidElement(child) && child.props.mdxType === 'CodeExample') {
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
