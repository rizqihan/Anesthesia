import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anesthesia — Point-of-Care Clinical Suite for Medical Professionals',
  description: 'Offline-first point-of-care medical suite, clinical decision calculators, 12-lead ECG simulation, acute resuscitation dosing, and practice guidelines for physicians, residents, and healthcare professionals.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Anesthesia',
  },
};

export const viewport: Viewport = {
  themeColor: '#080c15',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <body
        className="antialiased min-h-screen text-[var(--text-primary)] bg-[var(--bg-base)] selection:bg-blue-500/20 selection:text-blue-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
