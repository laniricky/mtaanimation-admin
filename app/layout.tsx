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
        <body className={`${inter.className} bg-[#0f1115] text-gray-100 antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}