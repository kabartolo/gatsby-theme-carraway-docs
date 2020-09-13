/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { useMDXComponents } from '@mdx-js/react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';

import usePrismTheme from '../../hooks/usePrismTheme';

import styles from './playground.module.scss';

export default function Playground({ code }) {
  const theme = usePrismTheme();
  const components = useMDXComponents();

  return (
    <div className={styles.container} sx={{ variant: 'divs.playground' }}>
      <LiveProvider code={code} scope={components} theme={theme}>
        <div className={`live-preview ${styles.preview}`}>
          <LivePreview />
        </div>
        <div className={`live-editor ${styles.editor}`}>
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
