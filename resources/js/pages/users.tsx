import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

export type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
};

// Columns of the table
export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>, // TODO: convert to enum"></div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" variant="secondary">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Make changes to users data here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <UserProfile user={user} />
            </DialogContent>
          </Dialog>
          <Button className="cursor-pointer" variant="destructive">
            Delete
          </Button>
        </div>
      );
    },
  },
];

export default function Users({ users }: { users: { data: User[] } }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <DataTable columns={columns} data={users.data} />
        </div>
      </div>
    </AppLayout>
  );
}

type UserProfileProps = {
  user: User;
  className?: string;
} & React.ComponentProps<'form'>;

function UserProfile({ user, className }: UserProfileProps) {
  const { data, setData, put } = useForm({
    name: user.name,
    email: user.email,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put('/users');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('grid items-start gap-4', className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          onChange={(e) => setData('email', e.target.value)}
          defaultValue={data.email}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          onChange={(e) => setData('name', e.target.value)}
          defaultValue={data.name}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
