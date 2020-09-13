import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

function useLocation() {
  return useContext(SiteContext).location;
}

export { useLocation };
