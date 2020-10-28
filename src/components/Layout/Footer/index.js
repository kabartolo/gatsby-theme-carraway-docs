/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import ExternalLink from '../../ExternalLink';

import styles from './footer.module.scss';

export default function Footer({ className }) {
  return (
    <div
      id="footer-container"
      className={`footer-container ${styles.footer} ${className}`}
      sx={{
        borderTop: 'thick',
        borderColor: 'border',
        bg: 'background',
      }}
    >
      &#169;2020 K. A. Bartolo
      <span className="footer-credit">
        <ExternalLink href="https://gatsbyjs.com/">Gatsby</ExternalLink>
        &nbsp;theme:&nbsp;
        <ExternalLink href="https://kabartolo.github.io/chicago-docs-demo/">
          Chicago Docs
        </ExternalLink>
      </span>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};
