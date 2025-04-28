'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../../components/shared/sidebar/AppSidebar';
import { AppSidebarHeader } from '../../components/shared/AppSidebarHeader';
import { ownerSidebar } from '@/constant/sidebar';
import { SidebarItems } from '@/types';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar sidebarItems={ownerSidebar as SidebarItems[]} />
      <main className="w-full">
        <AppSidebarHeader />
        <div className="p-10 bg-sidebar h-screen">{children}</div>
      </main>
    </SidebarProvider>
  );
}
