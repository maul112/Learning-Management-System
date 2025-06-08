import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bell, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { Separator } from './ui/separator';

type NavItem = {
  icon?: LucideIcon;
  name: string;
  href: string;
};

interface StudentNavUserProps {
  user: User;
  items: NavItem[];
  variant?: 'header' | 'sidebar';
}

export function StudentNavUser({
  user,
  items,
  variant = 'header',
}: StudentNavUserProps) {
  const { auth } = usePage<SharedData>().props;
  const { url } = usePage();
  const getInitials = useInitials();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'sidebar' && !isMobile ? 'mr-10' : 'mr-5',
      )}
    >
      {auth.user && url !== '/student/dashboard' && (
        <Button variant="ghost">
          <Link href={route('student.dashboard')}>Dashboard</Link>
        </Button>
      )}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className="felx gap-5">
                <AvatarImage
                  src={`/storage/${user.avatar}`}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[150px]">
                {items.map((item) => (
                  <NavigationMenuLink key={item.name} asChild>
                    <Link
                      className="w-full cursor-pointer"
                      method={item.href === '/logout' ? 'post' : 'get'}
                      href={item.href}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.name}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </ul>
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
          <Separator className="bg-muted-foreground my-2" />
          <div className="flex h-[22rem] w-full items-center justify-center">
            <p className="text-muted-foreground">No notifications</p>
          </div>
          <Separator className="bg-muted-foreground my-2" />
          <Button className="w-full">Mark all as read</Button>
        </HoverCardContent>
      </HoverCard>

      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
        <DrawerTrigger asChild>
          {isMobile && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 flex-col justify-center gap-2 px-1"
            >
              <span
                className={cn(
                  'bg-accent-foreground h-px w-full origin-bottom-left transition-all duration-300',
                  isOpen ? 'rotate-[35deg]' : '',
                )}
              />
              <span
                className={cn(
                  'bg-accent-foreground h-px w-full transition-all duration-300',
                  isOpen ? 'scale-0' : '',
                )}
              />
              <span
                className={cn(
                  'bg-accent-foreground h-px w-full origin-bottom-left transition-all duration-300',
                  isOpen ? '-rotate-[35deg]' : '',
                )}
              />
            </div>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <div className="grid w-full gap-2 p-5">
            {items.map((item) => (
              <Link
                key={item.name}
                className="w-full cursor-pointer"
                method={item.href === '/logout' ? 'post' : 'get'}
                href={item.href}
              >
                <div className="hover:bg-muted flex items-center gap-3 p-5">
                  {item.icon && <item.icon />}
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
