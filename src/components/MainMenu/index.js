/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './mainmenu.module.scss';

export default function MainMenu({
  closeDropdown,
  menu,
  linkVariant,
  listItemVariant,
}) {
  return (
    <nav>
      <ul className={styles.mainMenu}>
        {menu.items.map((item) => (
          <li key={item.name} sx={{ variant: listItemVariant }}>
            <Styled.a
              as={Link}
              sx={{ variant: linkVariant }}
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
  linkVariant: PropTypes.string,
  listItemVariant: PropTypes.string,
};

MainMenu.defaultProps = {
  closeDropdown: () => null,
  linkVariant: '',
  listItemVariant: '',
};
