// package
import { useState, useEffect, useRef, useCallback } from 'react';

// slice
import { UseIntersectionVisibilityOptions } from '../types';

export function useIntersectionVisibility<T extends HTMLElement>(
  dataLength: number,
  options?: UseIntersectionVisibilityOptions
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const itemRefs = useRef<(T | null)[]>([]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = parseInt(
            (entry.target as T).getAttribute('data-id') || '0'
          );
          setVisibleItems((prev) => {
            if (!prev.has(id)) {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            }
            return prev;
          });
        }
      });
    },
    []
  );

  useEffect(() => {
    const defaultObserver = new IntersectionObserver(handleIntersect, {
      root: options?.root || null,
      rootMargin: options?.rootMargin || '0px 0px -10% 0px',
      threshold: options?.threshold || 0.1,
    });

    let lastItemObserver: IntersectionObserver | undefined;

    if (
      options?.offsetForLastItems !== undefined &&
      options.offsetForLastItems > 0
    ) {
      lastItemObserver = new IntersectionObserver(handleIntersect, {
        root: options?.root || null,
        rootMargin: '0px 0px 20% 0px',
        threshold: 0,
      });
    }

    setVisibleItems(new Set());

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        if (
          lastItemObserver &&
          options?.offsetForLastItems !== undefined &&
          index >= dataLength - options.offsetForLastItems
        ) {
          lastItemObserver.observe(ref);
        } else {
          defaultObserver.observe(ref);
        }
      }
    });

    return () => {
      defaultObserver.disconnect();
      if (lastItemObserver) {
        lastItemObserver.disconnect();
      }
    };
  }, [handleIntersect, dataLength, options]);

  const setItemRef = useCallback((el: T | null, id: number) => {
    itemRefs.current[id - 1] = el;
  }, []);

  return { visibleItems, setItemRef };
}
