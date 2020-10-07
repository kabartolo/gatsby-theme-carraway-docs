/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './toggle.module.scss';

export default function Toggle({
  icon1,
  icon2,
  name,
  onClick,
  onToggle,
  tooltip,
}) {
  const [icon, setIcon] = useState(icon1);

  function click() {
    setIcon(icon === icon1 ? icon2 : icon1);
    onToggle();
    onClick();
  }

  return (
    <button
      id={name}
      name={name}
      title={tooltip}
      type="button"
      onClick={(event) => click(event)}
      className={`toggle-button ${styles.button}`}
      sx={{ variant: 'buttons.toggle' }}
    >
      {icon}
    </button>
  );
}

Toggle.propTypes = {
  icon1: PropTypes.node.isRequired,
  icon2: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onToggle: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};

Toggle.defaultProps = {
  onClick: () => null,
  tooltip: null,
};
