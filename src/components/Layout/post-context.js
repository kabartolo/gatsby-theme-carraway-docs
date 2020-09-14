import { createContext } from 'react';

export const PostContext = createContext({
  postId: null,
  setPostId: () => {},
  menu: null,
  setMenu: () => {},
  showSidebar: null,
  setShowSidebar: () => {},
});
