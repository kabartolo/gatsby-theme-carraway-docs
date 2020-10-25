import { useContext } from 'react';
import { DocContext } from '../components/Layout/doc-context';

function useDocContext() {
  return useContext(DocContext);
}

export { useDocContext };
