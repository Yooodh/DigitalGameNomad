'use client';

// layer
import { useAuthGuard } from '@/shared/hooks/useAuthGuard';

export default function layout({ children }: { children: React.ReactNode }) {
  useAuthGuard({
    requireLogin: true,
    allowRoles: ['admin'],
    redirectTo: '/forbidden?reason=admin',
  });

  return <>{children}</>;
}
