import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar';

export function NavGroup({
  groupTitle,
  icon,
  items,
  ...props
}: {
  groupTitle: string;
  icon?: LucideIcon | null;
  items: NavItem[];
}) {
  const page = usePage();
  const isGroupActive = items.some((item) => item.href === page.url);
  const [open, setOpen] = useState<boolean>(isGroupActive);
  const Icon = icon;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      defaultOpen
      className="group/collapsible"
      {...props}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            asChild
            isActive={isGroupActive}
            tooltip={{ children: groupTitle }}
          >
            <Link href={items[0].href}>
              {Icon && <Icon />}
              <span>{groupTitle}</span>
              <ChevronDown
                className={cn(
                  'ml-auto transition-transform',
                  open ? 'rotate-180' : '',
                )}
              />
            </Link>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {items.map((item) => (
            <SidebarMenuSub key={item.title}>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <Link href={item.href || '#'}>{item.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          ))}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
