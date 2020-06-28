import React from 'react';
import PropTypes from 'prop-types';

export default function CodeExample({ children }) {
  const childrenArray = React.Children.toArray(children);
  const codeBlocks = childrenArray.filter((child) => child.props.mdxType === 'pre');
  /* eslint-disable no-param-reassign */
  const blocksByLang = codeBlocks.reduce((map, block) => {
    map[block.props.children.props.className.replace(/language-/, '')] = block;
    return map;
  }, {});
  /* eslint-enable no-param-reassign */

  const languages = Object.keys(blocksByLang);
  console.log(languages);
  return (
    <div>{children}</div>
  );
}

CodeExample.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
