/** @jsx jsx */
import { jsx } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

import { useThemeOptions } from '../../../hooks';

import Dropdown from '../Dropdown';
import Icons from './icons';
import MainMenu from '../MainMenu';
import Search from '../../Search';
import SiteTitle from './site-title';

import styles from './header.module.scss';

const menuIcon = <FontAwesomeIcon icon={faBars} />;
const closeIcon = <FontAwesomeIcon icon={faWindowClose} />;

export default function Header() {
  const { allowDocsSearch, mainMenu } = useThemeOptions();

  return (
    <div
      id="header"
      className={`header-container ${styles.container}`}
      sx={{
        borderBottom: 'thick',
        borderColor: 'border',
        bg: 'background',
      }}
    >
      <span className={`header-main ${styles.header}`}>
        <SiteTitle />
        <span className={`header-content ${styles.headerContent}`}>
          {MainMenu && (
            <MainMenu
              menu={mainMenu}
              listItemSX={{ variant: 'listItems.layout' }}
              linkSX={{ variant: 'links.layout' }}
            />
          )}
          <span className={`header-right ${styles.headerRight}`}>
            {allowDocsSearch && <Search />}
            <Icons className={`header-icons ${styles.icons}`} />
          </span>
        </span>
        <span className={`header-mobile-menu ${styles.mobileMenu}`}>
          <Dropdown
            openIcon={menuIcon}
            closeIcon={closeIcon}
            themeUI={{
              bg: 'backgroundSecondary',
              borderBottom: 'thick',
              borderColor: 'border',
              boxShadowBottom: 'main',
            }}
          >
            <Icons className={`header-mobile-icons ${styles.icons}`} />
            {allowDocsSearch && <Search />}
            {MainMenu && (
              <MainMenu
                menu={mainMenu}
                listItemSX={{
                  borderBottom: 'main',
                  borderColor: 'border',
                  ':first-of-type': {
                    borderTop: 'main',
                    borderColor: 'border',
                  },
                  variant: 'listItems.layout',
                }}
                linkSX={{ variant: 'links.layout' }}
              />
            )}
          </Dropdown>
        </span>
      </span>
    </div>
  );
}
