import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { RootContent } from '@/components/root-content';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import RootLayout from '@/layouts/root-layout';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ProfileForm = {
  avatar: File | null;
  name: string;
  email: string;
  _method: string;
};

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean;
  status?: string;
}) {
  const { auth } = usePage<SharedData>().props;
  const initials = useInitials();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm<Required<ProfileForm>>({
      avatar: null,
      name: auth.user.name,
      email: auth.user.email,
      _method: 'patch',
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('profile.update'), {
      preserveScroll: true,
      forceFormData: true,
      method: 'patch',
      onError: (e) => console.log(e),
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
              title="Profile information"
              description="Update your name and email address"
            />
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <HeadingSmall
                    title="Profile information"
                    description="Update your name and email address"
                  />

                  <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                      <Label htmlFor="avatar">Avatar</Label>
                      <Avatar className="h-16 w-16 overflow-hidden rounded-full">
                        <AvatarImage
                          src={
                            profilePhoto
                              ? URL.createObjectURL(profilePhoto)
                              : auth.user.avatar
                                ? `/storage/${auth.user.avatar}`
                                : undefined
                          }
                          className="object-cover"
                        />

                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                          {initials(data.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        id="avatar"
                        type="file"
                        className="mt-1 block w-full"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setProfilePhoto(file);
                            setData('avatar', file);
                          }
                        }}
                      />

                      <InputError className="mt-2" message={errors.avatar} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>

                      <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Full name"
                      />

                      <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email address</Label>

                      <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Email address"
                      />

                      <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail &&
                      auth.user.email_verified_at === null && (
                        <div>
                          <p className="text-muted-foreground -mt-4 text-sm">
                            Your email address is unverified.{' '}
                            <Link
                              href={route('verification.send')}
                              method="post"
                              as="button"
                              className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                            >
                              Click here to resend the verification email.
                            </Link>
                          </p>

                          {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                              A new verification link has been sent to your
                              email address.
                            </div>
                          )}
                        </div>
                      )}

                    <div className="flex items-center gap-4">
                      <Button disabled={processing}>Save</Button>

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
                </div>

                <DeleteUser />
              </CardContent>
            </Card>
          </div>
        </div>
      </RootContent>
    </RootLayout>
  );
}
