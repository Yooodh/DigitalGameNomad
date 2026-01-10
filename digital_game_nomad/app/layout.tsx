// package
import { Metadata } from 'next';

// slice
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Digital Game Nomad',
  description: '어디서든 함께 즐기는 3D 게임 박람회!',
  icons: {
    icon: '/images/logo_white_half.png',
    apple: '/images/logo_white_half.png',
  },
  openGraph: {
    title: 'Digital Game Nomad',
    description: '어디서든 함께 즐기는 3D 게임 박람회!',
    images: [
      {
        url: 'https://digitalgamenomad.vercel.app/images/logo_white_full_open_graph.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
