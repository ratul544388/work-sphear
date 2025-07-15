import { MonthNumberToStringMap } from "@/constants";
import { cn, formatPrice } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "salary",
    header: "Amount",
    cell: ({row}) => formatPrice(row.original.salary)
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const { paidAt, transactionId } = row.original;
      return (
        <div
          className={cn(
            "",
            !paidAt &&
              "bg-orange-500 text-xs font-medium rounded-full px-2 text-white w-fit"
          )}
        >
          {paidAt ? transactionId : "Not Paid"}
        </div>
      );
    },
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
];
