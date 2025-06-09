// slice
import './globals.scss';

// layer
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
