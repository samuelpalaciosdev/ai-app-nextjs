'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './theme-provider';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
