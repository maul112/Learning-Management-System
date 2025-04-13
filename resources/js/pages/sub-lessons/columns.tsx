import { DataTableColumnHeader } from '@/components/data-table-header';
import { Checkbox } from '@/components/ui/checkbox';
import { SubLesson } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<SubLesson>[] = [
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
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('title')}</div>;
    },
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Order"
      />
    ),
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue('order')}</div>;
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const subLesson = row.original;
      return (
        <div className="flex gap-2">
          <EditSubLesson subLesson={subLesson} />
          <DeleteSubLesson subLesson={subLesson} />
        </div>
      );
    },
  },
];

function EditSubLesson({ subLesson }: { subLesson: SubLesson }) {
  return (
    <Link
      href={route('sub-lessons.edit', subLesson.id)}
      className="text-indigo-600 hover:text-indigo-900"
    >
      Edit
    </Link>
  );
}

function DeleteSubLesson({ subLesson }: { subLesson: SubLesson }) {
  return (
    <Link
      href={route('sub-lessons.destroy', subLesson.id)}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </Link>
  );
}
