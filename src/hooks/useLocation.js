import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

export default function useLocation() {
  return useContext(SiteContext).location;
}
