import IVideo from "@/types/IVideo";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IVideo>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <div className="pl-3">Title</div>;
    },
    sortingFn: (a, b) => {
      return (
        new Date(a.original.created_at).getTime() -
        new Date(b.original.created_at).getTime()
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="pl-3">Status</div>;
    },
  },
];
