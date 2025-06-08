import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

export function StudentSettingsNavigation() {
  const currentPath = window.location.pathname;
  const navigateItems = [
    {
      title: 'Profile',
      href: '/student/settings/profile',
    },
    {
      title: 'Password',
      href: '/student/settings/password',
    },
    {
      title: 'Appearance',
      href: '/student/settings/appearance',
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {navigateItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          size="lg"
          className={cn('relative w-full justify-start', {
            'bg-muted': currentPath === item.href,
          })}
          asChild
        >
          <Link href={item.href}>
            {currentPath === item.href && (
              <motion.span
                layoutId="active"
                className="bg-accent-foreground absolute left-0 h-full w-[2px]"
                aria-hidden="true"
              />
            )}
            {item.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
