import { placeholderUserImage } from "@/constants";
import { format } from "date-fns";
import MonthDropdown from "./month-dropdown";
import TaskDropdown from "./task-dropdown";
import EmployeeDropdown from "./employee-dropdropdown";

export const columns = [
  {
    accessorKey: "user",
    header: <EmployeeDropdown/>,
    cell: ({ row }) => {
      const { name, email, image } = row.original.user;
      return (
        <div className="flex items-center gap-1.5">
          <img
            src={image || placeholderUserImage}
            alt="Avater"
            className="size-9 rounded-full"
          />
          <div>
            <p className="font-medium">{name}</p>
            <span>{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "task",
    header: <TaskDropdown />,
    cell: ({ row }) => (
      <p className="capitalize">{row.original.task.toLowerCase()}</p>
    ),
  },
  {
    accessorKey: "month",
    header: <MonthDropdown />,
    cell: ({ row }) => format(new Date(row.original.date), "MMMM"),
  },
];
