import { useEffect } from 'react';

/* eslint-disable no-param-reassign */
export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const detectClickOutside = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', detectClickOutside);
    document.addEventListener('touchstart', detectClickOutside);

    return () => {
      document.removeEventListener('mousedown', detectClickOutside);
      document.removeEventListener('touchstart', detectClickOutside);
    };
  }, [ref, handler]);
};
/* eslint-enable no-param-reassign */
