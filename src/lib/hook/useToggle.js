import { useState, useCallback, useEffect } from 'react';

export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
 
  useEffect(() => {
    setIsOpen(initialState);
  }, [initialState]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, toggle };
};
