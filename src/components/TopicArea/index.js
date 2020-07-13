import React, {
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './topicarea.module.scss';

export default function TopicArea({ children }) {
  const uid = useUID();
  const { height, width } = useWindowDimensions();
  const blockMargin = 12;

  function getCodeBlocks() {
    const example = document.getElementById(`example-container-${uid}`);
    if (!example) return null;
    return Array.from(example.children).map((child) => child.getElementsByClassName('prism-code')[0]);
  }

  function updateBlockHeight() {
    const codeBlocks = getCodeBlocks();
    if (!codeBlocks) return;

    /* eslint-disable no-param-reassign */
    const totalBlockHeights = codeBlocks.reduce((sum, block) => (
      sum + block.offsetHeight + blockMargin
    ), 0);

    const parent = document.getElementById(`example-area-${uid}`);
    const padding = parseInt(window.getComputedStyle(parent).paddingTop, 10);
    const numBlocks = codeBlocks.length;

    const areaHeight = height - (padding * 2) + blockMargin;
    const blockHeight = areaHeight / numBlocks;

    if (totalBlockHeights <= areaHeight) return;

    codeBlocks.forEach((block) => {
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

  const childrenArray = React.Children.toArray(children);
  let codeBlocks = [];
  let rest = [];
  childrenArray.forEach((child) => {
    child.props.mdxType === 'pre' || child.props.mdxType === 'CodeExample'
      ? codeBlocks = codeBlocks.concat(child)
      : rest = rest.concat(child);
  });

  return (
    <section id={`topic-${uid}`} className={styles.topicArea}>
      <section id={`content-${uid}`} className={styles.contentArea}>
        {rest}
      </section>
      <section id={`example-area-${uid}`} className={styles.exampleArea}>
        <div id={`example-container-${uid}`} className={styles.examples}>
          {Children.map(codeBlocks, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, { updateBlockHeight });
            }
            return child;
          })}
        </div>
      </section>
    </section>
  );
}

TopicArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
