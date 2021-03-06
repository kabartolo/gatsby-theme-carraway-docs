/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Copy({ className, delay, value }) {
  const [copied, setCopied] = useState(false);
  const COPIED_TEXT = 'Copied';
  const COPY_TEXT = 'Copy';

  return (
    <CopyToClipboard text={value}>
      <button
        disabled={copied}
        type="button"
        className={`copy-button ${className}`}
        onClick={async () => {
          setCopied(true);
          await new Promise((resolve) => setTimeout(resolve, delay));
          setCopied(false);
        }}
        sx={{
          bg: 'transparent',
          '&[disabled]': {
            cursor: 'none',
          },
          variant: 'buttons.default',
        }}
      >
        {copied ? COPIED_TEXT : COPY_TEXT}
      </button>
    </CopyToClipboard>
  );
}

Copy.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  delay: PropTypes.number,
};

Copy.defaultProps = {
  className: '',
  delay: 5000,
};
