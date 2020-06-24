import { createContext } from 'react';

export const PostContext = createContext({
  postType: null,
  setPostType: () => {},
  currentGroup: null,
  setCurrentGroup: () => {},
  postID: null,
  setPostID: () => {},
});
