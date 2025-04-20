import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Course, User } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Course>[] = [
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
        arial-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'instructor',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown>
        column={column}
        title="Instructor"
      />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('instructor') as User)?.name}
      </div>
    ),
  },
  {
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown> column={column} title="Order" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('order')}</div>
    ),
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown>
        column={column}
        title="Difficulty"
      />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('difficulty')}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const course = row.original;
      console.log(course);

      return (
        <div className="flex space-x-2">
          <EditCourse course={course} />
          <DeleteModal resourceName="course" id={course.id} />
        </div>
      );
    },
  },
];

function EditCourse({ course }: { course: Course }) {
  return (
    <Button className="cursor-pointer" variant="secondary">
      <Link href={route('courses.edit', course.id)}>Edit</Link>
    </Button>
  );
}
