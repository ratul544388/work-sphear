import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LayoutGridIcon, TableIcon } from "lucide-react";
import { useState } from "react";
import { Pagination } from "./pagination";

export function DataTable({
  columns,
  data,
  className,
  dataCount,
  viewPerPage,
  multiViewMode,
}) {
  const [viewMode, setViewMode] = useState("table");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {multiViewMode && (
        <div className="w-fit border shadow-sm rounded-md bg-background p-1 ml-auto">
          <Button
            onClick={() => setViewMode("grid")}
            variant="ghost"
            className={cn("size-8", viewMode === "grid" && "bg-accent")}
          >
            <LayoutGridIcon className="size-4" />
          </Button>
          <Button
            onClick={() => setViewMode("table")}
            variant="ghost"
            className={cn("size-8", viewMode === "table" && "bg-accent")}
          >
            <TableIcon className="size-4" />
          </Button>
        </div>
      )}
      {viewMode === "table" ? (
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
                            header.getContext()
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
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
      ) : (
        // ✅ Updated Dynamic Grid Section
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {data.length > 0 ? (
            data.map((rowData, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-sm bg-white space-y-2"
              >
                {columns.map((column) => {
                  const Cell = column.cell;
                  const content = Cell
                    ? Cell({ row: { original: rowData } })
                    : rowData[column.accessorKey];

                  return (
                    <p key={column.accessorKey} className="text-sm">
                      <span className="font-medium">
                        {typeof column.header === "string"
                          ? column.header
                          : column.accessorKey}
                        :
                      </span>{" "}
                      {content}
                    </p>
                  );
                })}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No results found.
            </p>
          )}
        </div>
      )}

      {dataCount && (
        <Pagination
          dataCount={dataCount}
          viewPerPage={viewPerPage}
          className="mt-5"
        />
      )}
    </div>
  );
}
