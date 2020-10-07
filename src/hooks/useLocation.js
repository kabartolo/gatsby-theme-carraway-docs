import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

function useLocation() {
  const { location } = useContext(SiteContext);
  return location;
}

export { useLocation };
