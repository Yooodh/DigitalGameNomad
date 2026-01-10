'use client';

// slice
import './globals.scss';
import styles from './styles/layout.module.scss';

// layer
import { Navbar } from '@/shared/components/NavBar';
import { useAuthRedirect } from '@/shared/hooks/useAuthRedirect';
import ApplyTheme from '@/shared/ui/theme/ApplyTheme';
import ToastProvider from '@/shared/components/ToastProvider';
import AnimatedBackground from '@/shared/ui/background/animatedBackground/AnimatedBackground';
import ScrollToTopInitializer from '@/shared/components/ScrollToTopInitializer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthRedirect();

  return (
    <>
      <ApplyTheme />
      <ScrollToTopInitializer />
      <ToastProvider />
      <div className={styles.layout}>
        <div className={styles.layout__header}>
          <Navbar />
        </div>
        <AnimatedBackground>
          <main className={styles.layout__main}>{children}</main>
        </AnimatedBackground>
      </div>
    </>
  );
}
