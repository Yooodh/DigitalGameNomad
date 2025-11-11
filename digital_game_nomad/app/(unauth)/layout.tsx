'use client';

// layer
import { useAuthGuard } from '@/shared/hooks/useAuthGuard';

export default function layout({ children }: { children: React.ReactNode }) {
  useAuthGuard({
    blockLoggedIn: true,
    redirectTo: '/forbidden?reason=default',
  });

  return <>{children}</>;
}
