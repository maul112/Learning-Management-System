import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutDashboardIcon, LogOutIcon, Settings, User } from 'lucide-react';
import { StudentNavUser } from './student-nav-user';

export function AppSidebarHeader({
  breadcrumbs = [],
}: {
  breadcrumbs?: BreadcrumbItemType[];
}) {
  const { auth } = usePage<SharedData>().props;

  const navListItems = [
    {
      icon: LayoutDashboardIcon,
      name: 'Dashboard',
      href: '/student/dashboard',
    },
    {
      icon: User,
      name: 'Profile Saya',
      href: `/student/${auth.user.name}/profile`,
    },
    {
      icon: Settings,
      name: 'Settings',
      href: '/student/settings/profile',
    },
    {
      icon: LogOutIcon,
      name: 'Logout',
      href: '/logout',
    },
  ];

  return (
    <header className="border-sidebar-border/50 bg-background flex h-20 shrink-0 items-center justify-between gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-20 md:px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      {auth.user.role === 'student' && (
        <StudentNavUser
          user={auth.user}
          items={navListItems}
          variant="header"
        />
      )}
    </header>
  );
}
