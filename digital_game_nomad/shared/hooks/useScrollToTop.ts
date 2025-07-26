// package
import { useEffect } from 'react';

// slice
import { ScrollBehavior } from '../types';

export function useScrollToTop(
  dependency: any,
  behavior: ScrollBehavior = 'smooth'
) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: behavior,
    });
  }, [dependency, behavior]);
}
