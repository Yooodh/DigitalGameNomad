'use client';

// slice
import './globals.scss';
import styles from './styles/layout.module.scss';

// layer
import { Navbar } from '@/shared/components/NavBar';
import ApplyTheme from '@/shared/ui/theme/ApplyTheme';
import AnimatedBackground from '@/shared/ui/background/animatedBackground/AnimatedBackground';
import ScrollToTopInitializer from '@/shared/components/ScrollToTopInitializer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ApplyTheme />
        <ScrollToTopInitializer />
        <div className={styles.layout}>
          <div className={styles.layout__header}>
            <Navbar />
          </div>
          <AnimatedBackground>
            <main className={styles.layout__main}>{children}</main>
          </AnimatedBackground>
        </div>
      </body>
    </html>
  );
}
