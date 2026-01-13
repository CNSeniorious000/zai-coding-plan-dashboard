import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { UsageProvider } from '@/components/UsageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <UsageProvider>
          {children}
        </UsageProvider>
      </body>
    </html>
  );
}
