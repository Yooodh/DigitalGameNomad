// package
import { useEffect } from 'react';

export function useCloseMenuOnResize(
  isMenuOpen: boolean,
  setIsMenuOpen: (value: boolean) => void
) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, setIsMenuOpen]);
}
