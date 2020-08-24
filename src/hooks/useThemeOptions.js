import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

export default function useThemeOptions() {
  return useContext(SiteContext).themeOptions;
}
