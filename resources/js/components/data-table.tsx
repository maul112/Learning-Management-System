import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { DataTableViewOptions } from './data-table-view-options';
import { Input } from './ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // header columns of table
  data: TData[]; // data of table
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // core row model
    getPaginationRowModel: getPaginationRowModel(), // pagination model
    onSortingChange: setSorting, // setState for sorting
    getSortedRowModel: getSortedRowModel(), // sorted row model
    onColumnFiltersChange: setColumnFilters, // setState for column filters
    getFilteredRowModel: getFilteredRowModel(), // filtered row model
    onColumnVisibilityChange: setColumnVisibility, // setState for column visibility
    onRowSelectionChange: setRowSelection, // setState for row selection
    state: {
      sorting, // sorted state
      columnFilters, // column filters state
      columnVisibility, // column visibility state
      rowSelection, // row selection state
      // add more state
    },
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center px-2 py-4">
        <Input
          placeholder="Filters names ..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* View options visibility */}
        <DataTableViewOptions table={table} />
      </div>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
