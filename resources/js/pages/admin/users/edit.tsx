import FormFieldInput from '@/components/form-field-input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import FormLayout from '@/layouts/form-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
  {
    title: 'Edit',
    href: '/users/edit',
  },
];

export default function UsersEdit({
  user,
  success,
  error,
}: {
  user: User;
  success?: string;
  error?: string;
}) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    password: '',
    role: user.role,
    status: user.status,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route('users.update', user.id), {
      onError: (e) => console.log(e),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {success && toast.success(success)}
      {error && toast.error(error)}
      <Head title="Create User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <FormLayout onSubmit={handleSubmit}>
            <FormFieldInput
              htmlFor="name"
              label="Name"
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              message={errors.name || ''}
            />
            <FormFieldInput
              htmlFor="email"
              label="Email"
              type="email"
              id="email"
              name="email"
              placeholder="risqi@gmail.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              message={errors.email || ''}
            />
            <FormFieldInput
              htmlFor="password"
              label="Password"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              message={errors.password || ''}
            />
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Role</Label>
              <Select
                value={data.role}
                onValueChange={(value) => setData('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                    <SelectItem value="student">student</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputError message={errors.role} />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              tabIndex={4}
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Save
            </Button>
          </FormLayout>
        </div>
      </div>
    </AppLayout>
  );
}
