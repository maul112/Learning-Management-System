import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
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
    accessorKey: 'lesson',
    header: ({ column }) => (
      <DataTableColumnHeader<SubLesson, unknown>
        column={column}
        title="Lesson"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {(row.getValue('lesson') as SubLesson)?.title}
        </div>
      );
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
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const subLesson = row.original;
      return (
        <div className="flex gap-2">
          <EditSubLesson subLesson={subLesson} />
          <DeleteModal resourceName="sub-lesson" id={subLesson.id} />
        </div>
      );
    },
  },
];

function EditSubLesson({ subLesson }: { subLesson: SubLesson }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('sub-lessons.edit', subLesson.id)}>Edit</Link>
    </Button>
  );
}
