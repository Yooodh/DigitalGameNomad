'use client';

// package
import { useMemo } from 'react';

// slice
import AboutPresenter from '../presenter/AboutPresenter';
import { ABOUT } from '../data';

// layer
import { useIntersectionVisibility } from '@/shared/hooks/useIntersectionVisibility';

export default function AboutContainer() {
  const options = useMemo(
    () => ({
      offsetForLastItems: 3,
    }),
    []
  );

  const { visibleItems, setItemRef } = useIntersectionVisibility(
    ABOUT.length,
    options
  );

  return (
    <AboutPresenter
      about={ABOUT}
      visibleItems={visibleItems}
      setItemRef={setItemRef}
    />
  );
}
