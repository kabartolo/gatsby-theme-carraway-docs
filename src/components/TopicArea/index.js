import React from 'react';
import PropTypes from 'prop-types';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from './topicarea.module.scss';

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

  return (
    <section className={styles.topicArea}>
      <section className={styles.contentArea}>
        {rest}
      </section>
      <section className={styles.exampleArea}>
        {codeBlocks}
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
