/** @jsx jsx */
/* eslint-disable no-unused-vars */
import { jsx } from 'theme-ui';
import React, {
  useEffect,
  useRef,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import { useWindowDimensions } from '../../hooks';
import styles from './section.module.scss';

export default function Section({ children }) {
  const uid = useUID();
  let height;
  let width;
  const dimensions = useWindowDimensions();
  if (dimensions) {
    height = dimensions.height;
    width = dimensions.width;
  }
  const blockMargin = 12;
  const sectionRef = useRef();

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
    const section = sectionRef.current;
    const heading = section && section.querySelector('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    if (heading) {
      section.id = heading.getAttribute('id');
    }
  });

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
    if (child.props && child.props.mdxType === 'hr') {
      leftComplete = true;
      return;
    }

    leftComplete
      ? rightColumn = rightColumn.concat(child)
      : leftColumn = leftColumn.concat(child);
  });

  return (
    <section ref={sectionRef} className={styles.section} sx={{ variant: 'divs.section' }}>
      <div id={`left-column-${uid}`} className={rightColumn.length ? styles.leftColumn : styles.noColumns}>
        {leftColumn}
      </div>
      <div id={`right-column-${uid}`} className={rightColumn.length ? styles.rightColumn : ''}>
        <div id={`block-container-${uid}`} className={styles.blocks}>
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
