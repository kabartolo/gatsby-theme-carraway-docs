import { createContext } from 'react';

export const SiteContext = createContext({
  location: null,
  setLocation: () => {},
  themeOptions: null,
  setThemeOptions: () => {},
});
