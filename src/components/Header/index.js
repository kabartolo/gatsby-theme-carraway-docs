/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

import useSiteMetadata from '../../hooks/useSiteMetadata';

import styles from './header.module.scss';

import Dropdown from '../Dropdown';
import Search from '../Search';

const menuIcon = <FontAwesomeIcon icon={faBars} />;
const closeIcon = <FontAwesomeIcon icon={faWindowClose} />;

function MainMenu({ closeDropdown, className, menu }) {
  return (
    <ul className={className}>
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
  );
}

export default function Header({
  menu,
  children,
}) {
  const { title } = useSiteMetadata();

  return (
    <div id="header" className={styles.container}>
      <span className={styles.header} sx={{ variant: 'spans.header' }}>
        <h1>{title}</h1>
        <span className={styles.headerContent}>
          <MainMenu className={styles.mainMenu} menu={menu} />
          <span className={styles.headerRight}>
            <Search />
            <div className={styles.icons}>
              {children}
            </div>
          </span>
        </span>
        <span className={styles.mobileMenu}>
          <Dropdown
            openIcon={menuIcon}
            closeIcon={closeIcon}
            themeUI={{ variant: 'divs.mobileMenu' }}
          >
            <div className={styles.icons}>
              {children}
            </div>
            <Search />
            <MainMenu className={styles.mainMenu} menu={menu} />
          </Dropdown>
        </span>
      </span>
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  menu: PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  menu: {},
  children: [],
};

MainMenu.propTypes = {
  closeDropdown: PropTypes.func,
  className: PropTypes.string,
  menu: PropTypes.instanceOf(Object),
};

MainMenu.defaultProps = {
  closeDropdown: () => null,
  className: '',
  menu: {},
};
