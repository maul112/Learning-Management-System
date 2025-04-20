import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';

interface NavMenuProps {
  type?: 'link' | 'dropdown';
  title: string;
  href?: string;
  items?: NavItem[];
}

export function NavMenu({ type = 'link', title, href, items }: NavMenuProps) {
  if (type === 'dropdown') {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[200px] gap-3">
                {items?.map((item) => (
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={href || '#'} className="cursor-pointer">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
