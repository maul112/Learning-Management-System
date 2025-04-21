import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Lesson, Module } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Lesson>[] = [
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
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'module',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('module') as Module)?.course.title}
      </div>
    ),
  },
  {
    accessorKey: 'module',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Module" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('module') as Module)?.title}
      </div>
    ),
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<Lesson, unknown> column={column} title="Order" />
    ),
  },
  {
    accessorKey: 'id',
    header: 'Content',
    cell: ({ row }) => (
      <div className="capitalize">
        <Link
          className="underline"
          href={route('lessons.show', row.getValue('id'))}
        >
          Lihat
        </Link>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const lesson = row.original;

      return (
        <div className="flex space-x-2">
          <EditLesson lesson={lesson} />
          <DeleteModal resourceName="lesson" id={lesson.id} />
        </div>
      );
    },
  },
];

function EditLesson({ lesson }: { lesson: Lesson }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('lessons.edit', lesson.id)}>Edit</Link>
    </Button>
  );
}
