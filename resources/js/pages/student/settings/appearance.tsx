import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { RootContent } from '@/components/root-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import RootLayout from '@/layouts/root-layout';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Appearance() {
  const currentPath = window.location.pathname;
  return (
    <RootLayout>
      <Head title="Appearance settings" />
      <RootContent className="pt-32">
        <div className="grid grid-cols-1 gap-5 px-40 md:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-3">
            <Button
              variant="ghost"
              size="lg"
              className={cn('relative w-full justify-start', {
                'bg-muted': currentPath === '/student/settings/profile',
              })}
            >
              {currentPath === '/student/settings/profile' && (
                <motion.span
                  layoutId="active"
                  className="bg-accent-foreground absolute left-1 h-full w-[2px]"
                  aria-hidden="true"
                />
              )}
              <Link href="/student/settings/profile">Profile</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn('relative w-full justify-start', {
                'bg-muted': currentPath === '/student/settings/password',
              })}
            >
              {currentPath === '/student/settings/password' && (
                <motion.span
                  layoutId="active"
                  className="bg-accent-foreground absolute left-1 h-full w-[2px]"
                  aria-hidden="true"
                />
              )}
              <Link href="/student/settings/password">Password</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn('relative w-full justify-start', {
                'bg-muted': currentPath === '/student/settings/appearance',
              })}
            >
              {currentPath === '/student/settings/appearance' && (
                <motion.span
                  layoutId="active"
                  className="bg-accent-foreground absolute left-1 h-full w-[2px]"
                  aria-hidden="true"
                />
              )}
              <Link href="/student/settings/appearance">Appearance</Link>
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent>
                <HeadingSmall
                  title="Appearance settings"
                  description="Update your account's appearance settings"
                />
                <AppearanceTabs />
              </CardContent>
            </Card>
          </div>
        </div>
      </RootContent>
    </RootLayout>
  );
}
