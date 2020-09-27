import { useContext } from 'react';
import { SiteContext } from '../components/Layout/site-context';

import withDefault from '../utils/with-default';

function useThemeOptions() {
  const { themeOptions } = useContext(SiteContext);

  return withDefault(themeOptions);
}

export { useThemeOptions };
