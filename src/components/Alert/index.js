/** @jsx jsx */
import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';

import styles from './alert.module.scss';

export default function Alert({ children, variant }) {
  return (
    <aside className={`carraway-alert ${styles.alert}`} sx={{ variant: `alerts.${variant}` }}>
      {children}
    </aside>
  );
}

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  variant: PropTypes.string,
};

Alert.defaultProps = {
  variant: 'information',
};
