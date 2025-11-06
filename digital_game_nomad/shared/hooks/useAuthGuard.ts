'use client';

// package
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// slice
import { useAuthStore } from '../stores/useAuthStore';

const ROLE_MAP: Record<number, string> = {
  1: 'admin',
  2: 'company',
  3: 'user',
};

export const useAuthGuard = (options: {
  requireLogin?: boolean;
  allowRoles?: string[];
  blockLoggedIn?: boolean;
  redirectTo?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, userGrade, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;

    const role = userGrade ? ROLE_MAP[userGrade] : null;

    if (options.blockLoggedIn && isLoggedIn) {
      router.replace(options.redirectTo || '/');
      return;
    }

    if (options.allowRoles && !isLoggedIn) {
      router.replace(`/forbidden?reason=${options.allowRoles[0]}`);
      return;
    }

    if (options.allowRoles && (!role || !options.allowRoles.includes(role))) {
      router.replace(`/forbidden?reason=${options.allowRoles[0]}`);
      return;
    }

    if (options.requireLogin && !isLoggedIn) {
      router.replace(`/login?next=${pathname}`);
    }
  }, [isLoggedIn, userGrade, isHydrated, router, options, pathname]);
};
