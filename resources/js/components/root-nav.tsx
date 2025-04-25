import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { RootNavMain } from './root-nav-main';
import { StudentNavUser } from './student-nav-user';

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

export function RootNav() {
  const { auth } = usePage<SharedData>().props;
  const isMobile = useIsMobile();

  return (
    <nav className="bg-background fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-8 py-5 shadow-md">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="cursor-pointer text-2xl font-bold transition-all duration-300 hover:-rotate-3"
          prefetch
        >
          NextLMS
        </Link>

        {!isMobile && (
          <>
            <Input type="search" placeholder="Search" className="w-72" />
            <RootNavMain />
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        {!auth.user && (
          <>
            <Button variant="outline">
              <Link href={route('login')}>Login</Link>
            </Button>
            <Button variant="secondary">
              <Link href={route('register')}>Register</Link>
            </Button>
          </>
        )}
      </div>
      {auth.user?.role === 'student' && (
        <StudentNavUser user={auth.user} items={navListItems} />
      )}
      {auth.user?.role === 'admin' && (
        <div className={cn('flex items-center')}>
          {auth.user && (
            <Button variant="ghost">
              <Link href={route('dashboard')}>Dashboard</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
