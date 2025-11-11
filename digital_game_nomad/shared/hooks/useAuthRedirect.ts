'use client';

// package
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useAuthStore } from '../stores/useAuthStore';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useAuthStore();
  const prevIsLoggedIn = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    if (
      prevIsLoggedIn.current !== null &&
      prevIsLoggedIn.current !== isLoggedIn
    ) {
      router.push('/');
    }

    prevIsLoggedIn.current = isLoggedIn;
  }, [isLoggedIn, isHydrated, router]);
};
