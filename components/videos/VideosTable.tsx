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
import { useAtom } from "jotai";
import { userStore } from "@/stores/user";

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
  const [user] = useAtom(userStore);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleRowClick(video: IVideo) {
    setVideo(video);
    setOpen(true);
  }

  function getContentInTemplate(video?: IVideo) {
    if (!video) {
      return "";
    }

    const template = user?.markdown_template;

    if (!template) {
      return video.prompt_response;
    }

    const keys: string[] = Object.keys(video);

    let content = template;
    keys.forEach((key: string) => {
      if (key in video) {
        content = content.replace(`{{${key}}}`, video[key as keyof IVideo]);
      }
    });

    return content;
  }

  async function saveToObsidian(
    fileContent: string,
    noteName: string,
    path: string,
    vault: string,
    behavior: "append" | "prepend" | "append-daily" | "prepend-daily"
  ): Promise<void> {
    let obsidianUrl: string;

    const isDailyNote =
      behavior === "append-daily" || behavior === "prepend-daily";

    if (isDailyNote) {
      obsidianUrl = `obsidian://daily?`;
    } else {
      // Ensure path ends with a slash
      if (path && !path.endsWith("/")) {
        path += "/";
      }

      const formattedNoteName = sanitizeFileName(noteName);
      obsidianUrl = `obsidian://new?file=${encodeURIComponent(
        path + formattedNoteName
      )}`;
    }

    if (behavior.startsWith("append")) {
      obsidianUrl += "&append=true";
    } else if (behavior.startsWith("prepend")) {
      obsidianUrl += "&prepend=true";
    }

    const vaultParam = vault ? `&vault=${encodeURIComponent(vault)}` : "";
    obsidianUrl += vaultParam;

    if (typeof window === "undefined") {
      throw new Error("This function can only be used client-side.");
    }

    // Use clipboard or URI method
    try {
      await navigator.clipboard.writeText(fileContent);
      obsidianUrl += `&clipboard`;
      openObsidianUrl(obsidianUrl);
    } catch (err) {
      console.error("Failed to copy content to clipboard:", err);
      obsidianUrl += `&clipboard`;
      obsidianUrl += `&content=${encodeURIComponent(
        "There was an error creating the content. Make sure you are using Obsidian 1.7.2 or above."
      )}`;
      openObsidianUrl(obsidianUrl);
    }
  }

  // Helper to open the Obsidian URL in the same tab
  function openObsidianUrl(url: string) {
    if (window && window.location) {
      window.location.href = url;
    }
  }

  // Utility to sanitize the note name
  function sanitizeFileName(fileName: string): string {
    return fileName.replace(/[\\/:*?"<>|]/g, "-");
  }

  function saveAndOpenInObsidian(fileContent: string, video?: IVideo) {
    if (!video) {
      return;
    }

    const noteName = video.title || "Untitled";
    const path = "References/YouTube";
    const vault = "GuppyBrain";
    const behavior = "append";

    saveToObsidian(fileContent, noteName, path, vault, behavior);

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
                              header.getContext()
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
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <ScrollArea className="h-full overflow-y-auto">
            <DialogHeader className="flex flex-col items-start mt-6 mb-6">
              <h1 className="font-bold text-xl pb-6">{video?.title}</h1>
              <ScrollArea className="max-h-[900px] overflow-y-auto">
                <div className="p-8 bg-gray-100 rounded-xl font-mono">
                  <p className="whitespace-pre-line">
                    {getContentInTemplate(video)}
                  </p>
                </div>
              </ScrollArea>
            </DialogHeader>
          </ScrollArea>
          <Button
            onClick={() => {
              saveAndOpenInObsidian(getContentInTemplate(video) || "", video);
            }}
          >
            Add to Obsidian
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
