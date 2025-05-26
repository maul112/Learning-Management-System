import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import { RootContent } from '@/components/root-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RootLayout from '@/layouts/root-layout';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import HeadingSmall from '@/components/heading-small';

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  const currentPath = window.location.pathname;

  return (
    <RootLayout>
      <Head title="Profile settings" />

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
            <HeadingSmall
              title="Update password"
              description="Ensure your account is using a long, random password to stay secure"
            />
            <Card>
              <CardContent>
                <form onSubmit={updatePassword} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="current_password">Current password</Label>

                    <Input
                      id="current_password"
                      ref={currentPasswordInput}
                      value={data.current_password}
                      onChange={(e) =>
                        setData('current_password', e.target.value)
                      }
                      type="password"
                      className="mt-1 block w-full"
                      autoComplete="current-password"
                      placeholder="Current password"
                    />

                    <InputError message={errors.current_password} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">New password</Label>

                    <Input
                      id="password"
                      ref={passwordInput}
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      type="password"
                      className="mt-1 block w-full"
                      autoComplete="new-password"
                      placeholder="New password"
                    />

                    <InputError message={errors.password} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                      Confirm password
                    </Label>

                    <Input
                      id="password_confirmation"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                      }
                      type="password"
                      className="mt-1 block w-full"
                      autoComplete="new-password"
                      placeholder="Confirm password"
                    />

                    <InputError message={errors.password_confirmation} />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save password</Button>

                    <Transition
                      show={recentlySuccessful}
                      enter="transition ease-in-out"
                      enterFrom="opacity-0"
                      leave="transition ease-in-out"
                      leaveTo="opacity-0"
                    >
                      <p className="text-sm text-neutral-600">Saved</p>
                    </Transition>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </RootContent>
    </RootLayout>
  );
}
