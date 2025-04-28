import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface IProps {
  item: any;
}

const SidebarItem = ({ item }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      {item.url ? (
        <SidebarMenuButton
          asChild
          isActive={item.isActive}
          className="m-0 h-4.5 gap-0 rounded-none text-[16px] hover:bg-orange-100 hover:text-sidebar-accent-foreground "
        >
          <Link className="w-full font-medium" href={item.url}>
            {item.title}
          </Link>
        </SidebarMenuButton>
      ) : (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen={isOpen}
          onOpenChange={() => setIsOpen(!isOpen)}
          className="group gap-0"
        >
          <SidebarGroup className="p-0">
            <SidebarGroupLabel
              asChild
              className="group/label hover:bg-orange-100 text-black hover:text-sidebar-accent-foreground rounded-none text-[16px]"
            >
              <CollapsibleTrigger className="h-auto gap-0 flex justify-between">
                {item.title}
                <ChevronLeft
                  className={`transition-transform stroke-primary ${isOpen ? '-rotate-90' : 'rotate-0'}`}
                />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="gap-0">
              <SidebarGroupContent className="gap-0">
                <SidebarMenu className="gap-0 gap-y-1">
                  {item.items?.map((item: any, idx: any) => {
                    let url = item.url;
                    const role = session!.user.role;
                    if (
                      role === 'SELLER' ||
                      (role === 'OWNER' && item.title.toLowerCase() === 'sales')
                    ) {
                      let store = [];
                      if (role === 'SELLER') store = session!.user.seller_store;
                      if (role === 'OWNER') store = session!.user.store_owner;
                      if (store.length > 0) {
                        if (store.length === 1) {
                          const urlParts = item.url.split('/'); // Split the URL into parts
                          urlParts.splice(3, 0, store[0].id.toString()); // Insert storeId at the third "/" (index 3)
                          url = urlParts.join('/'); // Rejoin the URL
                        }
                      }
                    }
                    return (
                      <SidebarMenuItem
                        className=" hover:bg-orange-100 text-[15px] font-medium hover:text-sidebar-accent-foreground "
                        key={idx}
                      >
                        <Link href={url} className="w-full pl-2 flex gap-1 items-center">
                          <item.icon className={`h-4 w-4 stroke-primary`} />
                          {item.title}
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      )}
    </>
  );
};

export default SidebarItem;
