import { useEffect } from 'react';

/* eslint-disable no-param-reassign */
export const useEscape = (ref, handler) => {
  useEffect(() => {
    const detectEscapeKey = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      handler(event);
    };

    document.addEventListener('keydown', detectEscapeKey);

    return () => {
      document.removeEventListener('keydown', detectEscapeKey);
    };
  }, [ref, handler]);
};
/* eslint-enable no-param-reassign */
