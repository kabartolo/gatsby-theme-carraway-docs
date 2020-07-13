import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useUID } from 'react-uid';

import styles from './codeExample.module.scss';

import { ThemeContext } from '../Layout/theme-context';

export default function CodeExample({
  children,
  title,
  labels,
  updateBlockHeight,
}) {
  const childrenArray = React.Children.toArray(children);
  const codeBlocks = childrenArray.filter((child) => child.props.mdxType === 'pre');
  const uid = `code-example-${useUID()}`;

  useEffect(() => updateBlockHeight());

  /* eslint-disable no-param-reassign */
  const blocksByLang = codeBlocks.reduce((map, block) => {
    map[block.props.children.props.className.replace(/language-/, '')] = block;
    return map;
  }, {});
  /* eslint-enable no-param-reassign */

  const languages = Object.keys(blocksByLang);
  const [defaultLang] = languages;

  const [blockValue, setBlockValue] = useState(blocksByLang[defaultLang]);

  const { theme } = useContext(ThemeContext);
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;

  function getText(blockObject) {
    return blockObject.props.children.props.children;
  }

  function onChange({ target: { value } }) {
    setBlockValue(blocksByLang[value]);
  }

  return (
    <div id={uid} className={themeClass}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.util}>
            {(labels.length > 1)
              ? (
                <span className={styles.selectWrapper}>
                  <select className={styles.select} onChange={onChange} onBlur={onChange}>
                    {languages.map((lang, i) => (
                      <option value={lang}>{labels[i]}</option>
                    ))}
                  </select>
                </span>
              )
              : <span className={styles.label}>{labels[0]}</span>}
            <span className={styles.divider} />
            <CopyToClipboard text={getText(blockValue)}>
              <button
                type="button"
                title="Click to copy"
                className={styles.copyButton}
              >
                <i className={`${styles.materialIcons} material-icons`}>content_copy</i>
              </button>
            </CopyToClipboard>
          </span>
        </div>
        <div className={styles.codeBlock}>
          {blockValue}
        </div>
      </div>
    </div>
  );
}

CodeExample.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(String).isRequired,
  updateBlockHeight: PropTypes.func,
};

CodeExample.defaultProps = {
  title: '',
  updateBlockHeight: () => {},
};
