import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Course, Module } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Module>[] = [
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
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Module, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('title')}</div>;
    },
  },
  {
    accessorKey: 'course',
    header: ({ column }) => (
      <DataTableColumnHeader<Module, unknown> column={column} title="Course" />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {(row.getValue('course') as Course)?.title}
        </div>
      );
    },
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<Module, unknown> column={column} title="Order" />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">Langkah {row.getValue('order')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditModule module={row.original} />
        <DeleteModal resourceName="module" id={row.original.id} />
      </div>
    ),
  },
];

function EditModule({ module }: { module: Module }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('modules.edit', module.id)}>Edit</Link>
    </Button>
  );
}
