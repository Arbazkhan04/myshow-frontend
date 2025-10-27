import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useNavigate } from "react-router";

interface DataTableProps<T extends RowData> {
  columns: ColumnDef<T, any>[];
  data: T[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
  isPagination?: boolean;
  navigateMode?: boolean;
  navigateUrl?: string; // e.g. "/admin/workers-management"
}

export function DataTable<T extends RowData>({
  columns,
  data,
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
  isPagination = false,
  navigateMode = false,
  navigateUrl,
}: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [jumpPage, setJumpPage] = React.useState<number>(page);
  const navigate = useNavigate();

  const getPaginationItems = () => {
    const items: number[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else if (page <= 3) {
      for (let i = 1; i <= 5; i++) {
        items.push(i);
      }
    } else if (page >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      for (let i = page - 2; i <= page + 2; i++) {
        items.push(i);
      }
    }
    return items;
  };

  const paginationItems = getPaginationItems();

  React.useEffect(() => {
    setJumpPage(page);
  }, [page]);

  return (
    <>
      <div className="w-full overflow-x-auto max-w-[calc(100vw-48px)]">
        <Table className="min-w-full">
          <TableHeader className="bg-neutral-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap text-gray-700 dark:text-gray-200"
                  >
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
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "hover:bg-primary/10 dark:hover:bg-primary/20 duration-200",
                    navigateMode ? "cursor-pointer" : ""
                  )}
                  onClick={() => {
                    if (navigateMode && navigateUrl) {
                      const id = (row.original as any)._id;
                      if (id) navigate(`${navigateUrl}?id=${id}`);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap text-gray-800 dark:text-gray-100"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500 dark:text-gray-300"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isPagination && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-300 font-semibold">
              Rows:
            </span>
            <Select
              value={String(limit)}
              onValueChange={(val) => setLimit(Number(val))}
            >
              <SelectTrigger className="w-[70px] dark:bg-gray-800 dark:border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-gray-100">
                {[5, 10, 15, 25, 50, 100].map((opt) => (
                  <SelectItem
                    key={opt}
                    value={String(opt)}
                    className="dark:bg-gray-800 dark:text-gray-100"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-300 sm:mr-4 mr-0 font-semibold whitespace-nowrap">
                  Page {page}/{totalPages}
                </p>
                <Pagination>
                  <PaginationContent>
                    <div className="flex gap-0">
                      <PaginationItem>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage(page - 1);
                          }}
                          className={`h-9 w-9 bg-neutral-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-primary hover:text-white duration-200 flex items-center justify-center rounded-l border dark:border-gray-700 ${
                            page === 1 ? "pointer-events-none opacity-50" : ""
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      </PaginationItem>
                      <PaginationItem>
                        <input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={jumpPage}
                          onChange={(e) => setJumpPage(Number(e.target.value))}
                          onBlur={() => {
                            const val = Number(jumpPage);
                            if (val >= 1 && val <= totalPages && val !== page)
                              setPage(val);
                            setJumpPage(page);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const val = Number(jumpPage);
                              if (val >= 1 && val <= totalPages && val !== page)
                                setPage(val);
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          className="w-12 h-9 border text-center appearance-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                          aria-label="Go to page"
                          style={{ MozAppearance: "textfield" }}
                          inputMode="numeric"
                          pattern="[0-9]*"
                        />
                      </PaginationItem>
                      <PaginationItem className="mr-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage(page + 1);
                          }}
                          className={`h-9 w-9 bg-neutral-100 dark:bg-gray-800 disabled:opacity-50 hover:bg-primary hover:text-white duration-200 flex items-center justify-center rounded-r border dark:border-gray-700 ${
                            page === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          aria-label="Next page"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </PaginationItem>
                    </div>
                  </PaginationContent>
                </Pagination>
              </div>
              <Pagination className="hidden md:flex justify-end sm:justify-normal">
                <PaginationContent>
                  {paginationItems.map((item) => (
                    <PaginationItem key={item} className="text-white">
                      <PaginationLink
                        href="#"
                        isActive={item === page}
                        className={cn(
                          item === page
                            ? "bg-primary text-white"
                            : "dark:bg-gray-800 dark:text-gray-100"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(item);
                        }}
                      >
                        <span className="text-white">{item}</span>
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
