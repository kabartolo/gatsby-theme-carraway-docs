import React, { useState } from 'react';
import PropTypes from 'prop-types';

import toggleStyles from './toggle.module.scss';

export default function Toggle({
  onToggle,
  icon1,
  icon2,
  name,
}) {
  const [icon, setIcon] = useState(icon1);

  function onClick(event) {
    const element = event.target;
    const pressed = element.getAttribute('aria-pressed') === 'true';
    element.setAttribute('aria-pressed', !pressed);
    setIcon(icon === icon1 ? icon2 : icon1);
    onToggle();
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      name={name}
      id={name}
      className={toggleStyles.button}
      onClick={(event) => onClick(event)}
    >
      <span><i className="material-icons">{icon}</i></span>
    </button>
  );
}

Toggle.propTypes = {
  icon1: PropTypes.string,
  icon2: PropTypes.string,
  name: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

Toggle.defaultProps = {
  icon1: 'brightness_2',
  icon2: 'wb_sunny',
};
