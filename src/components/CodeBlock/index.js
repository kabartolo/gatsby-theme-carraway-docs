/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

import styles from './codeBlock.module.css';

export default function CodeBlock({ children, metastring, className: gatsbyClassName }) {
  const language = gatsbyClassName ? gatsbyClassName.replace(/language-/, '') : '';
  console.log(metastring);
  return (
    <Highlight {... defaultProps} theme={oceanicNext} code={children} language={language}>
      {({
        style,
        tokens,
        className,
        getLineProps,
        getTokenProps,
      }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div className={styles.line} key={i} {...getLineProps({ line, key: i })}>
              <span className={styles.number}>{i + 1}</span>
              <span className={styles.content}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string.isRequired,
  metastring: PropTypes.string,
};

CodeBlock.defaultProps = {
  children: '',
  metastring: '',
};
