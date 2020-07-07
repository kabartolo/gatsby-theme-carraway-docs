import React from 'react';
import PropTypes from 'prop-types';

import toggleStyles from './toggle.module.scss';

export default function Toggle({ onToggle, styles, name }) {
  console.log(styles);
  console.log(onToggle);

  function onClick(event) {
    const element = event.target;
    const pressed = element.getAttribute('aria-pressed') === 'true';
    element.setAttribute('aria-pressed', !pressed);
    onToggle();
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      name={name}
      id={name}
      className={toggleStyles.switch}
      onClick={(event) => onClick(event)}
    >
      <span className={`${toggleStyles.label} ${toggleStyles.labelLeft}`} />
    </button>
  );
}

Toggle.propTypes = {
  name: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  styles: PropTypes.instanceOf(Object),
};

Toggle.defaultProps = {
  styles: {
    switch: '',
    labelLeft: '',
    labelRight: '',
  },
};
