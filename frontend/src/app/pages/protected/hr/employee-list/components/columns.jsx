import { Link } from "react-router";
import PaySalaryButton from "./pay-salary-button";
import VerifiedCellButton from "./verified-cell-button";
import { buttonVariants } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { placeholderUserImage } from "@/constants";

export const columns = [
  {
    accessorKey: "image",
    header: "Photo",
    cell: ({ row }) => (
      <img
        src={row.original.image || placeholderUserImage}
        alt="photo"
        className="size-8 object-cover rounded-full bg-accent"
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
    accessorKey: "pay",
    header: "Pay",
    cell: ({ row }) => <PaySalaryButton employee={row.original} />,
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
