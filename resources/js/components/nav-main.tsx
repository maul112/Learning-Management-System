import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavGroup as NavGroupType, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { NavGroup } from './nav-group';

export function NavMain({
  items = [],
  groupItems = [],
}: {
  items: NavItem[];
  groupItems: NavGroupType[];
}) {
  const page = usePage();
  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.href === page.url}
              tooltip={{ children: item.title }}
            >
              <Link href={item.href}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {groupItems.map((group) => (
          <NavGroup
            key={group.title}
            groupTitle={group.title}
            icon={group.icon}
            items={group.items}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
