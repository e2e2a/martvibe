'use client';
import { ChevronUp, User2 } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SidebarItem from './SidebarItem';
import { SidebarItems } from '@/types';

export function AppSidebar({ sidebarItems }: { sidebarItems: SidebarItems[] }) {
  return (
    <Sidebar>
      <SidebarContent className="text-lg bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>
            <h1 className="font-bold text-lg">
              <span className="text-primary italic text-2xl">M</span>
              art
              <span className="text-primary text-xl">V</span>
              ibe
            </h1>
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex ">
            <SidebarMenu className="gap-y-1.5 pt-3 flex pb-10">
              {sidebarItems.map((item, index) => {
                return (
                  <SidebarMenuItem key={index}>
                    {/* <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}> */}
                    <SidebarMenuButton asChild tooltip={{ children: item.title }}>
                      <SidebarItem item={item as any} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="focus-visible:ring-0">
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-[--radix-popper-anchor-width] "
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
