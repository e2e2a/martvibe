import { SidebarTrigger } from '@/components/ui/sidebar';

export function AppSidebarHeader() {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=offcanvas]/sidebar-wrapper:h-12 md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        <div className="flex md:hidden shrink-0 justify-between">
          <h1 className="font-bold text-lg">
            <span className="text-primary italic text-2xl">M</span>
            art
            <span className="text-primary text-xl">V</span>
            ibe
          </h1>
          <div className=""></div>
        </div>
      </div>
    </header>
  );
}
