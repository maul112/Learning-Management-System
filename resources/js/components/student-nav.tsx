import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { StudentNavMain } from './student-nav-main';
import { StudentNavUser } from './student-nav-user';

const mainNavItems = [
  {
    name: 'Home',
    href: '/student/dashboard',
  },
  {
    name: 'Academy',
    href: '/student/academic',
  },
  {
    name: 'Challenge',
    href: '/challenge',
  },
  {
    name: 'Event',
    href: '/event',
  },
];

const navListItems = [
  {
    name: 'Dashboard',
    href: '/student/dashboard',
  },
  {
    name: 'Profile',
    href: '/student/profile',
  },
  {
    name: 'Settings',
    href: '/student/settings',
  },
  {
    name: 'Logout',
    href: '/logout',
  },
];

export function StudentNav({
  variant = 'header',
}: {
  variant?: 'header' | 'sidebar';
}) {
  const { auth } = usePage<SharedData>().props;
  const isMobile = useIsMobile();
  const page = usePage();

  if (!page.url.startsWith('/student')) {
    return null;
  }

  return (
    <nav
      className={cn(
        'bg-background fixed top-0 right-0 left-0 z-50 flex items-center justify-between py-5 shadow-md',
        variant === 'sidebar' && !isMobile ? 'px-8' : 'px-24',
        isMobile && 'px-8',
      )}
    >
      <div className="flex w-1/2 items-center gap-3 md:gap-20 lg:gap-32">
        {variant === 'header' && (
          <Link
            href="/"
            className="cursor-pointer text-2xl font-bold transition-all duration-300 hover:-rotate-3"
          >
            NextLMS
          </Link>
        )}
        <StudentNavMain items={mainNavItems} />
      </div>
      <StudentNavUser
        user={auth.user}
        items={navListItems}
        variant={variant ? variant : 'header'}
      />
    </nav>
  );
}
