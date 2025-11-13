'use client';

// layer
import { useAuthGuard } from '@/shared/hooks/useAuthGuard';

export default function layout({ children }: { children: React.ReactNode }) {
  useAuthGuard({
    requireLogin: true,
    allowRoles: ['user', 'company', 'admin'],
    redirectTo: '/forbidden?reason=user',
  });

  return <>{children}</>;
}
