// package
import { useLayoutEffect } from 'react';

export function useLockBodyScroll(lock: boolean) {
  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    if (lock) {
      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      if (lock) {
        const scrollY = parseInt(document.body.style.top || '0', 10);
        window.scrollTo(0, Math.abs(scrollY));
      }
    };
  }, [lock]);
}
