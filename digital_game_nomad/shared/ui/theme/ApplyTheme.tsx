'use client';

// package
import { useLayoutEffect } from 'react';

// layer
import { useThemeStore } from '@/shared/stores/useThemeStore';

export default function ApplyTheme() {
  const theme = useThemeStore((state) => state.theme);

  useLayoutEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return null;
}
