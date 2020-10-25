import { createContext } from 'react';

export const DocContext = createContext({
  docId: null,
  setDocId: () => {},
  menu: null,
  setMenu: () => {},
});
