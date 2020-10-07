/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './main-menu.module.scss';

export default function MainMenu({
  closeDropdown,
  listItemVariant,
  linkVariant,
  menu,
}) {
  return (
    <nav className="main-menu">
      <ul className={`main-menu-list ${styles.mainMenu}`}>
        {menu.map((item) => (
          <li
            key={item.name}
            className={`main-menu-list-item ${styles.listItem}`}
            sx={{ variant: listItemVariant }}
          >
            <Styled.a
              as={Link}
              to={item.path}
              onClick={() => closeDropdown()}
              className={`main-menu-link ${styles.link}`}
              sx={{ variant: linkVariant }}
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
  listItemVariant: PropTypes.string,
  linkVariant: PropTypes.string,
  menu: PropTypes.instanceOf(Array).isRequired,
};

MainMenu.defaultProps = {
  closeDropdown: () => null,
  listItemVariant: '',
  linkVariant: '',
};
