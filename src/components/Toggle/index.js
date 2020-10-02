/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './toggle.module.scss';

export default function Toggle({
  onToggle,
  onClick,
  icon1,
  icon2,
  name,
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
      type="button"
      name={name}
      title={tooltip}
      id={name}
      className={styles.button}
      sx={{ variant: 'buttons.toggle' }}
      onClick={(event) => click(event)}
    >
      {icon}
    </button>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  icon1: PropTypes.node.isRequired,
  icon2: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

Toggle.defaultProps = {
  onClick: () => null,
  tooltip: null,
};
