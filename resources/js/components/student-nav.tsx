import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Separator } from './ui/separator';

export function StudentNav() {
  const { auth } = usePage<SharedData>().props;
  const page = usePage();
  const getInitials = useInitials();

  const navigationMenu = [
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

  return (
    <nav className="flex items-center justify-between px-10 py-5">
      <div className="flex w-1/2 items-center gap-30">
        <h2>NextLMS</h2>
        <div className="flex items-center gap-10">
          {navigationMenu.map((item) => (
            <Link
              key={item.name}
              href={item.href || '#'}
              prefetch
              className={cn(
                'flex flex-col text-neutral-400 hover:text-neutral-200',
                item.href === page.url ? 'text-neutral-200' : '',
              )}
            >
              {item.name}
              {item.href === page.url && (
                <motion.div
                  layoutId="underline"
                  id="underline"
                  className="h-1 w-full bg-neutral-200"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-10">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar className="felx gap-5">
                  <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                  <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink asChild>
                  <Link href="/student/dashboard">Dashboard</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/student/profile">Profile</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/student/settings">Settings</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href={route('logout')}>Logout</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost">
              <Bell />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="bg-accent mr-20 h-[30rem] w-[30rem]">
            <h3>Notifications</h3>
            <Separator className="my-2 w-full" />
            <div className="flex h-[22rem] w-full items-center justify-center">
              <p className="text-muted-foreground">No notifications</p>
            </div>
            <Separator className="my-2 w-full" />
            <Button className="w-full">Mark all as read</Button>
          </HoverCardContent>
        </HoverCard>
      </div>
    </nav>
  );
}
