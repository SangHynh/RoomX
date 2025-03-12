"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageIndex: number;
  pageSize: number;
  pageCount: number; // Nhận tổng số trang từ API
  onPageChange: (newPageIndex: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  pageCount,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true, // Phân trang thủ công từ API
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-muted text-muted-foreground font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="h-12 py-0 odd:bg-background even:bg-muted">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="h-8 py-0 leading-none">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button variant="outline" onClick={() => onPageChange(0)} disabled={pageIndex === 0}>
          {"<<"} First
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(pageIndex - 1, 0))}
          disabled={pageIndex === 0}
        >
          {"<"} Prev
        </Button>

        {/* Hiển thị số trang */}
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            variant={pageIndex === i ? "default" : "outline"}
            onClick={() => onPageChange(i)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(pageIndex + 1, pageCount - 1))}
          disabled={pageIndex >= pageCount - 1}
        >
          Next {">"}
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(pageCount - 1)}
          disabled={pageIndex >= pageCount - 1}
        >
          Last {">>"}
        </Button>
      </div>
    </div>
  );
}
