import {
  MonthNumberToStringMap,
  placeholderUserImage
} from "@/constants";
import { formatPrice } from "@/lib/utils";
import PayButton from "./pay-button";

export const columns = [
  {
    accessorKey: "user",
    header: "Employee",
    cell: ({ row }) => {
      const { name, image, email } = row.original.user;
      return (
        <div className="flex gap-1.5 items-center">
          <img
            src={image || placeholderUserImage}
            alt="photo"
            className="size-8 object-cover rounded-full bg-accent"
          />
          <div className="text-sm">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => formatPrice(row.original.salary),
  },
  {
    accessorKey: "month",
    header: "Month",
    cell: ({ row }) => MonthNumberToStringMap[row.original.month],
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "paidAt",
    header: "Payment Date",
  },
  {
    accessorKey: "pay",
    header: "Pay",
    cell: ({ row }) => <PayButton payroll={row.original} />,
  },
];
