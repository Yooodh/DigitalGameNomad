'use client';

// package
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// slice
import { ScrollBehavior } from '../types';

export function useScrollToTopOnRouteChange(
  behavior: ScrollBehavior = 'smooth'
) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: behavior,
      });
    }
  }, [pathname, behavior]);
}
