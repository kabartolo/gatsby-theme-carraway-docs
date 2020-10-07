/** @jsx jsx */
import { jsx } from 'theme-ui';

import ExternalLink from '../../ExternalLink';

import styles from './footer.module.scss';

export default function Footer() {
  return (
    <div className={`footer ${styles.footer}`} sx={{ variant: 'divs.footer' }}>
      &#169;2020 K. A. Bartolo
      <span>
        <ExternalLink href="https://gatsby.org">Gatsby</ExternalLink>
        &nbsp;theme:&nbsp;
        <ExternalLink href="https://kabartolo.github.io/carraway-docs">
          Carraway Docs
        </ExternalLink>
      </span>
    </div>
  );
}
