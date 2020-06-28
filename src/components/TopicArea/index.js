import React from 'react';
import PropTypes from 'prop-types';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './topicarea.module.css';

export default function TopicArea({ children }) {
  const { width } = useWindowDimensions();
  if (width < 850) {
    return (
      <div>{children}</div>
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
  // gather code examples if twoColumn is true
  // place them in div that appears on the right if screen is wide
  // otherwise, place code blocks wherever they originally appeared

  return (
    <div className={styles.topicArea}>
      <div>
        {rest}
      </div>
      <div>
        {codeBlocks}
      </div>
    </div>
  );
}

TopicArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
