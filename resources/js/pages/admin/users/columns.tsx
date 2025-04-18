import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User, string>[] = [
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
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const getInitials = useInitials();

      return (
        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
          <AvatarImage
            src={row.getValue('avatar')}
            alt={row.getValue('name')}
          />
          <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
            {getInitials(row.getValue('name'))}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader<User, unknown> column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader<User, unknown> column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div
        className={cn(
          'w-fit rounded-full p-1 capitalize',
          row.getValue('status') === 'active'
            ? 'text-green-600'
            : 'text-red-600',
        )}
      >
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-5">
          <EditUser user={user} />
          <DeleteModal resourceName="user" id={user.id} />
        </div>
      );
    },
  },
];

function EditUser({ user }: { user: User }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('users.edit', user.id)}>Edit</Link>
    </Button>
  );
}
