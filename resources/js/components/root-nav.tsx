import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Course, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { RootNavMain } from './root-nav-main';
import { StudentNavUser } from './student-nav-user';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './ui/command';
import { Input } from './ui/input';

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
  const { auth, courses } = usePage<SharedData>().props;
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setOpen(true);
    }
  };

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-popover-content]')
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when popover opens
  useEffect(() => {
    if (open && inputRef.current) {
      // Small delay to ensure the popover is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      // Focus the first command item
      const firstItem = document.querySelector('[cmdk-item]') as HTMLElement;
      firstItem?.focus();
    }
  };

  // Filter courses based on search
  const filteredCourses =
    courses.data.filter((course: Course) =>
      course.title.toLowerCase().includes(search.toLowerCase()),
    ) || [];

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
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                value={search}
                onChange={handleInputChange}
                onFocus={() => search.length > 0 && setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder="Apa yang ingin Anda pelajari?"
                className="w-[300px] rounded-md border px-4 py-2"
              />

              {open && filteredCourses.length > 0 && (
                <div
                  className="bg-popover absolute top-full left-0 z-50 mt-1 w-[300px] rounded-md border shadow-md"
                  data-popover-content
                >
                  <Command className="rounded-lg border shadow-md">
                    <CommandList>
                      {filteredCourses.length === 0 ? (
                        <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {filteredCourses.map((course) => (
                            <CommandItem
                              key={course.id}
                              value={course.title}
                              onSelect={() => {
                                // Handle selection
                                setSearch(course.title);
                                setOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Link href={`/academies/${course.id}`}>
                                {course.title}
                              </Link>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </div>
              )}
            </div>
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
