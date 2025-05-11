import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { EditButton } from '@/components/edit-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Academic, Course } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { BookIcon } from 'lucide-react';

export const columns: ColumnDef<Academic>[] = [
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
        className="w-40 h-20"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader<Academic, unknown> column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'courses',
    header: ({ column }) => (
      <DataTableColumnHeader<Academic, unknown>
        column={column}
        title="Total Courses"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <BookIcon className="h-4 w-4 text-blue-500" />{' '}
        {(row.getValue('courses') as Course[]).length} Courses
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const academic = row.original;

      return (
        <div className="flex space-x-2">
          <EditButton endpoint="academic" id={String(academic.id)} />
          <DeleteModal resourceName="academic" id={academic.id} />
        </div>
      );
    },
  },
];
