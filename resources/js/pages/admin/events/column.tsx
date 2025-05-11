import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Event } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Event, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => (
      <Link href={row.getValue('link')} className="hover:underline">
        View Event
      </Link>
    ),
  },
  {
    accessorKey: 'by',
    header: 'By',
    cell: ({ row }) => <div className="capitalize">{row.getValue('by')}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const event = row.original;

      return (
        <div className="flex space-x-2">
          <Button className="cursor-pointer" variant="secondary">
            <Link href={route('events.edit', event.id)}>Edit</Link>
          </Button>
          <DeleteModal resourceName="event" id={event.id} />
        </div>
      );
    },
  },
];
