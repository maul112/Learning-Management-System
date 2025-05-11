import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { EditButton } from '@/components/edit-button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Course } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ChartColumnDecreasing } from 'lucide-react';

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
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <img
        src={'/storage/' + row.getValue('image')}
        alt={row.getValue('title')}
        className="h-20 w-40"
      />
    ),
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
    accessorKey: 'order',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown> column={column} title="Order" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">Lankah {row.getValue('order')}</div>
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
      <div className="flex items-center gap-2 capitalize">
        <ChartColumnDecreasing
          className={cn(
            'h-4 w-4',
            row.getValue('difficulty') == 'beginner' && 'text-cyan-400',
            row.getValue('difficulty') == 'intermediate' && 'text-red-400',
            row.getValue('difficulty') == 'advanced' && 'text-violet-400',
          )}
        />
        {row.getValue('difficulty')}
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader<Course, unknown> column={column} title="Type" />
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('type')}</div>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const course = row.original;

      return (
        <div className="flex space-x-2">
          <EditButton endpoint="course" id={String(course.id)} />
          <DeleteModal resourceName="course" id={course.id} />
        </div>
      );
    },
  },
];
