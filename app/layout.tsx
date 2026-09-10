import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mtaanimation Admin',
  description: 'Admin dashboard for Mtaanimation website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`} style={{ background: '#1a1a2e', color: '#f0ece8' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}