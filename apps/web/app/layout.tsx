import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import SWRProvider from '@/components/providers/SWRProvider';
const inter = Inter({ subsets: ['latin'], display: 'swap', preload: false });
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
  title: 'Martvibe',
  description: 'Welcome, Your trusted shop inventory.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'], // you can adjust weights as needed
  display: 'swap',
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log('session layout:', session);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${(inter.className, poppins.className)}`}>
        <SWRProvider>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </SessionProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
