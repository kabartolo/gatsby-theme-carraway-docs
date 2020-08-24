import { useContext } from 'react';
import { PostContext } from '../components/Layout/post-context';

export default function usePostContext() {
  return useContext(PostContext);
}
