import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import IVideo from "@/types/IVideo";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function VideosTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [video, setVideo] = useState<IVideo | null>(null);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleRowClick(video: IVideo) {
    setVideo(video);
    setOpen(true);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="border border-neutrals-4 rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/75">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white/50">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row.original)}
                    className="cursor-pointer"
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
        <div className={`flex items-center justify-end space-x-2 py-4`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center"
          >
            <ArrowLeft weight="bold" className="mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center"
          >
            Next
            <ArrowRight weight="bold" className="ml-2" />
          </Button>
        </div>
        <DialogContent
          className="w-[800px]"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <ScrollArea className="h-full overflow-y-auto">
            <DialogHeader className="flex flex-col items-start mt-6 mb-6">
              <h1>{video?.title}</h1>
              <p>{video?.description}</p>
            </DialogHeader>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
