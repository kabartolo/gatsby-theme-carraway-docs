import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

function useThemeOptions() {
  return useContext(SiteContext).themeOptions;
}

export { useThemeOptions };
