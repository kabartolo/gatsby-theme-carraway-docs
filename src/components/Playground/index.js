/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import { mdx as createElement, MDXProvider, useMDXComponents } from '@mdx-js/react';
import mdx from '@mdx-js/mdx';
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';

import { usePrismTheme } from '../../hooks';

import styles from './playground.module.scss';

export default function Playground({ code, renderMDX }) {
  const prismTheme = usePrismTheme();

  const transformCode = (isMDX) => (src) => {
    if (!isMDX) {
      return `<>${src}</>`;
    }

    let transpiledMDX;

    try {
      transpiledMDX = mdx.sync(src, { skipExport: true });
    } catch (e) {
      return '';
    }

    return `
      ${transpiledMDX}

      render(
        <MDXProvider components={components}>
          <MDXContent {...props} />
        </MDXProvider>
      );
    `;
  };

  const components = useMDXComponents();

  const scope = {
    ...components,
    components,
    mdx: createElement,
    MDXProvider,
    props: {},
  };

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
        transformCode={transformCode(renderMDX)}
        scope={scope}
        noInline={renderMDX}
        theme={prismTheme}
      >
        <div
          className={`live-preview ${styles.preview}`}
          sx={{
            borderLeft: 'main',
            borderRight: 'main',
            borderColor: 'border',
          }}
        >
          <LivePreview style={{ width: '100%' }} />
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
  renderMDX: PropTypes.bool,
};

Playground.defaultProps = {
  renderMDX: false,
};
