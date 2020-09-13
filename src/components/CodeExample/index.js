/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect, Children } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useUID } from 'react-uid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import usePrismTheme from '../../hooks/usePrismTheme';
import styles from './codeExample.module.scss';

export default function CodeExample({
  children,
  title,
  labels,
  updateBlockHeight,
}) {
  const childrenArray = Children.toArray(children);
  const codeBlocks = childrenArray.filter((child) => child.props.mdxType === 'pre');
  const uid = `code-example-${useUID()}`;
  const { plain: theme } = usePrismTheme();

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

  function getText(blockObject) {
    return blockObject.props.children.props.children;
  }

  function onChange({ target: { value } }) {
    setBlockValue(blocksByLang[value]);
  }

  return (
    <div id={uid} className={styles.container} style={{ backgroundColor: theme.backgroundColor }}>
      <div className={styles.topBar} sx={{ variant: 'divs.codeTop' }}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.util}>
          {(labels.length > 1)
            ? (
              <span className={styles.selectWrapper}>
                <select
                  name="select-language"
                  className={styles.select}
                  onChange={onChange}
                  onBlur={onChange}
                >
                  {languages.map((lang, i) => (
                    <option key={lang} value={lang}>{labels[i]}</option>
                  ))}
                </select>
                <FontAwesomeIcon icon={faChevronDown} className={styles.selectArrow} />
              </span>
            )
            : <span className={styles.label}>{labels[0]}</span>}
          {(labels.length > 0) && <span className={styles.divider} />}
          <CopyToClipboard text={getText(blockValue)}>
            <button
              type="button"
              title="Click to copy"
              className={styles.copyButton}
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </CopyToClipboard>
        </span>
      </div>
      <div className={styles.codeBody}>
        {blockValue}
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
  labels: PropTypes.arrayOf(String),
  updateBlockHeight: PropTypes.func,
};

CodeExample.defaultProps = {
  title: '',
  updateBlockHeight: () => {},
  labels: [],
};
