/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { useMDXComponents } from '@mdx-js/react';
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';

import { usePrismTheme } from '../../hooks';

import styles from './playground.module.scss';

export default function Playground({ code }) {
  const theme = usePrismTheme();
  const components = useMDXComponents();

  return (
    <div
      className={`playground-container ${styles.container}`}
      sx={{
        borderTop: 'main',
        borderColor: 'border',
      }}
    >
      <LiveProvider
        code={code}
        scope={components}
        theme={theme}
      >
        <div
          className={`live-preview ${styles.preview}`}
          sx={{
            borderLeft: 'main',
            borderRight: 'main',
            borderColor: 'border',
          }}
        >
          <LivePreview />
        </div>
        <div
          className={`live-editor ${styles.editor}`}
          sx={{
            border: 'main',
            borderColor: 'border',
          }}
        >
          <LiveEditor />
        </div>
        <div className={`live-error ${styles.error}`}>
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  );
}

Playground.propTypes = {
  code: PropTypes.string.isRequired,
};
