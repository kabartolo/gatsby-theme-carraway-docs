import { useContext } from 'react';
import { PostContext } from '../components/Layout/post-context';

function usePostContext() {
  return useContext(PostContext);
}

export { usePostContext };
