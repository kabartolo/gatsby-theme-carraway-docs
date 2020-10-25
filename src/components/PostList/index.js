/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { Link } from 'gatsby';

import { useDocContext, useLocation } from '../../hooks';

import styles from './postlist.module.scss';

/* Returns a list of posts for the current menu or group index */
export default function PostList() {
  const { menu } = useDocContext();
  const location = useLocation();
  const removeEndingSlash = (path) => path && path.replace(/\/$/, '');
  const matchEndPath = (locationPath, menuPath) => {
    const re = new RegExp(`${removeEndingSlash(menuPath)}$`);
    return re.test(removeEndingSlash(locationPath));
  };

  const isMenuIndex = menu && matchEndPath(location.pathname, menu.path);
  const groupIndex = menu && menu.items && menu.items.find((item) => (
    matchEndPath(location.pathname, item.path)
  ));

  const currentMenu = isMenuIndex ? menu : groupIndex;

  if (!currentMenu) return null;

  return (
    <ul className={`post-list ${styles.postList}`}>
      {currentMenu.items.map((post) => (
        <Styled.li
          key={post.id}
          className="post-list-item"
        >
          <Styled.a
            as={Link}
            to={post.path}
            className="post-list-link"
            sx={{
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {post.title || post.name}
          </Styled.a>
        </Styled.li>
      ))}
    </ul>
  );
}
