/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './mainmenu.module.scss';

export default function MainMenu({ closeDropdown, menu }) {
  return (
    <nav>
      <ul className={styles.mainMenu}>
        {menu.items.map((item) => (
          <li key={item.name}>
            <Styled.a
              as={Link}
              sx={{ variant: 'links.mainMenu' }}
              to={item.path}
              onClick={() => closeDropdown()}
            >
              {item.name}
            </Styled.a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

MainMenu.propTypes = {
  closeDropdown: PropTypes.func,
  menu: PropTypes.shape({
    items: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

MainMenu.defaultProps = {
  closeDropdown: () => null,
};
