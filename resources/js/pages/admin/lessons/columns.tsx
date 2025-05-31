import { DataTableColumnHeader } from '@/components/data-table-header';
import { DeleteModal } from '@/components/delete-modal';
import { EditButton } from '@/components/edit-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Quiz } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Quiz>[] = [
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
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader<Quiz, unknown> column={column} title="Questions" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('question')}</div>
    ),
  },
  {
    accessorKey: 'options',
    header: ({ column }) => (
      <DataTableColumnHeader<Quiz, unknown> column={column} title="Options" />
    ),
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue('options') as Array<string>).length}
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const quiz = row.original;

      return (
        <div className="flex space-x-2">
          <EditButton endpoint="quizze" id={String(quiz.id)} />
          <DeleteModal resourceName="quizze" id={quiz.id} />
        </div>
      );
    },
  },
];
