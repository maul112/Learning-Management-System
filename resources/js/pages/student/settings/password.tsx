import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { RootContent } from '@/components/root-content';
import { StudentSettingsNavigation } from '@/components/student-settings-navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RootLayout from '@/layouts/root-layout';

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

  return (
    <RootLayout>
      <Head title="Profile settings" />

      <RootContent className="pt-32">
        <div className="grid grid-cols-1 gap-5 px-40 md:grid-cols-[1fr_3fr]">
          <StudentSettingsNavigation />

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
