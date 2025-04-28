'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../../components/shared/sidebar/AppSidebar';
import { AppSidebarHeader } from '../../components/shared/AppSidebarHeader';
import { sellerSidebar } from '@/constant/sidebar';
import { SidebarItems } from '@/types';
import { useSession } from 'next-auth/react';
import NotFound from '../not-found';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) return (window.location.href = '/signin');
  if (session.user.role !== 'SELLER') return <NotFound />;
  return (
    <SidebarProvider>
      <AppSidebar sidebarItems={sellerSidebar as SidebarItems[]} />
      <main className="w-full">
        <AppSidebarHeader />
        <div className="p-10 bg-sidebar h-screen">{children}</div>
      </main>
    </SidebarProvider>
  );
}
