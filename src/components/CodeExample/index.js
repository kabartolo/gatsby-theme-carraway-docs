/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Children, useState } from 'react';
import PropTypes from 'prop-types';
import { useUID } from 'react-uid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { usePrismTheme } from '../../hooks';

import Copy from '../copy';

import styles from './code-example.module.scss';

export default function CodeExample({
  children,
  labels,
  title,
}) {
  const childrenArray = Children.toArray(children);
  const codeBlocks = childrenArray.filter((child) => child.props.mdxType === 'pre');
  const uid = `code-example-${useUID()}`;
  const { plain: theme } = usePrismTheme();

  /* eslint-disable no-param-reassign */
  const blocksByLang = codeBlocks.reduce((map, block, index) => {
    const { className } = block.props.children.props;
    map[className ? className.replace(/language-/, '') : index] = block;
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
    <div
      id={uid}
      className={`code-example-container ${styles.container}`}
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <div
        className={`code-example-top-bar ${styles.topBar}`}
        sx={{ variant: 'divs.codeTop' }}
      >
        <h3 className={`code-example-title ${styles.title}`}>{title}</h3>
        <span className={`code-example-util ${styles.util}`}>
          {(labels.length > 1)
            ? (
              <span className={`code-example-select-wrapper ${styles.selectWrapper}`}>
                <select
                  name="select-language"
                  className={`code-example-select ${styles.select}`}
                  onChange={onChange}
                  onBlur={onChange}
                >
                  {languages.map((lang, i) => (
                    <option
                      key={lang}
                      value={lang}
                      className="code-example-option"
                    >
                      {labels[i]}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`code-example-select-arrow ${styles.selectArrow}`}
                />
              </span>
            )
            : <span className={`code-example-label ${styles.label}`}>{labels[0]}</span>}
          {(labels.length > 0) && <span className={`code-example-divider ${styles.divider}`} />}
          <Copy className={`code-example-copy ${styles.copyButton}`} value={getText(blockValue)} />
        </span>
      </div>
      <div className={`code-example-code-container ${styles.codeBody}`}>
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
  labels: PropTypes.arrayOf(String),
  title: PropTypes.string,
};

CodeExample.defaultProps = {
  labels: [],
  title: '',
};
