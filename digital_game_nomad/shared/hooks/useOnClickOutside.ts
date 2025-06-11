// package
import { useEffect, RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  options?: {
    enabled?: boolean;
    excludeRefs?: RefObject<HTMLElement | null>[];
  }
) {
  const enabled = options?.enabled ?? true;
  const excludeRefs = options?.excludeRefs || [];

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const targetNode = event.target as Node;

      if (ref.current && ref.current.contains(targetNode)) {
        return;
      }

      for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(targetNode)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled, excludeRefs]);
}
