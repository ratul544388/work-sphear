import { formatDate } from "@/lib/utils";
import CellDeleteButton from "./cell-delete-button";
import CellEditButton from "./cell-edit-button";

export const columns = [
  {
    accessorKey: "task",
    header: "Task",
    cell: ({ row }) => (
      <p className="capitalize">{row.original.task?.toLowerCase()}</p>
    ),
  },
  {
    accessorKey: "hours",
    header: "Hours",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.date),
  },
  {
    accessorKey: "editButton",
    header: "Edit",
    cell: ({ row }) => <CellEditButton workEntry={row.original} />,
  },
  {
    accessorKey: "deleteButton",
    header: "Delete",
    cell: ({ row }) => <CellDeleteButton workEntry={row.original} />,
  },
];
