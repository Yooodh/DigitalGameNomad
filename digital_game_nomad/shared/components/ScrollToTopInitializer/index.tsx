'use client';

// slice
import { useScrollToTopOnRouteChange } from '../../hooks/useScrollToTopOnRouteChange';

export default function ScrollToTopInitializer() {
  useScrollToTopOnRouteChange('smooth');
  return null;
}
