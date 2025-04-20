import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

type NavItem = {
  name: string;
  href: string;
};

export function StudentNavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();
  const isMobile = useIsMobile();

  return (
    <nav className="flex items-center gap-10">
      {isMobile && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {items.find((item) => item.href === page.url)?.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-[200px] flex-col">
                  {items.map((item) => (
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href={item.href}>{item.name}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {!isMobile &&
        items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
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
    </nav>
  );
}
