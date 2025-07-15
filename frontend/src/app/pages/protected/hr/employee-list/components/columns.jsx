import { buttonVariants } from "@/components/ui/button";
import { placeholderUserImage } from "@/constants";
import { FileText } from "lucide-react";
import { Link } from "react-router";
import CellPayButton from "./cell-pay-button";
import VerifiedCellButton from "./verified-cell-button";

export const columns = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => (
      <img
        src={row.original.image || placeholderUserImage}
        alt="photo"
        className="w-8 min-w-8 aspect-square object-cover rounded-full"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => <VerifiedCellButton employee={row.original} />,
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "bankAccountNo",
    header: "Bank Account No.",
  },
  {
    accessorKey: "pay",
    header: "Pay",
    cell: ({ row }) => <CellPayButton employee={row.original} />,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <Link
        to={`/dashboard/employee-list/${row.original.id}`}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <FileText className="size-4" />
        Details
      </Link>
    ),
  },
];
