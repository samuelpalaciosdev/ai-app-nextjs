import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'min-h-screen pt-12 antialiased')}>
        <AuthProvider>
          <div className='container max-w-7xl mx-auto h-full pt-12'>
            <Nav />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
