import './globals.css';
import type { Metadata, Viewport } from 'next';
import { BottomNav } from '@/components/BottomNav';
import { RegisterSW } from '@/components/RegisterSW';

export const metadata: Metadata = {
  title: 'MIQAT — The last prayer app you\'ll ever need',
  description: 'A privacy-first, ad-free, subscription-free Islamic prayer companion.',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'MIQAT' }
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF8F1' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1410' }
  ],
  width: 'device-width', initialScale: 1, viewportFit: 'cover', maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh pb-28">
        <main className="mx-auto w-full max-w-md px-5">{children}</main>
        <BottomNav />
        <RegisterSW />
      </body>
    </html>
  );
}
