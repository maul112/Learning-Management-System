import { useInitials } from '@/hooks/use-initials';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
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
  const getInitials = useInitials();
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'flex items-center',
        variant === 'sidebar' && !isMobile ? 'mr-20' : '',
      )}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className="felx gap-5">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {items.map((item) => (
                <NavigationMenuLink key={item.name} asChild>
                  <Link
                    method={item.href === '/logout' ? 'post' : 'get'}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              ))}
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
    </div>
  );
}
