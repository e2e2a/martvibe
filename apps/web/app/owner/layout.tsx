import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../../components/shared/sidebar/AppSidebar';
import { AppSidebarHeader } from '../../components/shared/AppSidebarHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppSidebarHeader />
        <div className="p-10 bg-sidebar h-screen">{children}</div>
      </main>
    </SidebarProvider>
  );
}
