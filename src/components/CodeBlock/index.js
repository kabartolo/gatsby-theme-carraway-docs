/* eslint-disable react/jsx-props-no-spreading, react/no-array-index-key, react/jsx-fragments */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
// import nightOwl from 'prism-react-renderer/themes/nightOwl';

import styles from './codeBlock.module.scss';

const linesToHighlight = (metastring) => {
  const regex = /{([\d,-]+)}/;
  if (!regex.test(metastring)) {
    return () => {};
  }
  const lineNumbers = regex.exec(metastring)[1]
    .split(',')
    .map((range) => range.split('-').map((digit) => parseInt(digit, 10)));
  return (index) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) => (
      end ? (lineNumber >= start && lineNumber <= end) : (lineNumber === start)
    ));
    return inRange;
  };
};

export default function CodeBlock({ children, metastring, className: gatsbyClassName }) {
  const language = gatsbyClassName ? gatsbyClassName.replace(/language-/, '') : '';
  const highlightLine = linesToHighlight(metastring);

  return (
    <div
      className={styles.codeBlock}
      sx={{ variant: 'divs.code' }}
    >
      <div className={styles.scrollContainer}>
        <Highlight {... defaultProps} code={children} language={language}>
          {({
            style,
            tokens,
            className,
            getLineProps,
            getTokenProps,
          }) => (
            <Fragment>
              <div className={styles.numberColumn}>
                {tokens.slice(0, -1).map((line, i) => (
                  <div
                    className={styles.number}
                    sx={{
                      variant: [
                        'divs.codeNumber',
                        highlightLine(i) && 'divs.highlightNumber',
                      ],
                    }}
                    key={i}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <pre className={`${className} ${styles.prismCode}`} style={style}>
                <code>
                  {tokens.slice(0, -1).map((line, i) => {
                    const lineProps = getLineProps({ line, key: i });
                    lineProps.className = `${lineProps.className} ${styles.line}`;
                    lineProps.sx = { variant: highlightLine(i) && 'divs.highlightLine' };

                    return (
                      <div key={i} {...lineProps}>
                        <span>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token, key })} />
                          ))}
                        </span>
                      </div>
                    );
                  })}
                </code>
              </pre>
            </Fragment>
          )}
        </Highlight>
      </div>
    </div>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  metastring: PropTypes.string,
};

CodeBlock.defaultProps = {
  children: '',
  className: '',
  metastring: '',
};
