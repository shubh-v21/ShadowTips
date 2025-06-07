import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShadowTips',
  description: 'Digital anonymity protocol for secure communications.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
        <body className={`${inter.className} bg-slate-900`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
