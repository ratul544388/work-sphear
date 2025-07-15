import { placeholderUserImage } from "@/constants";
import RoleDropdown from "./role-dropdown";
import FiredButton from "./fired-button";
import SalaryCell from "./salary-cell";

export const columns = [
  {
    accessorKey: "name",
    header: "Employee",
    cell: ({ row }) => {
      const { name, image, email } = row.original;
      return (
        <div className="flex gap-1.5 items-center">
          <img
            src={image || placeholderUserImage}
            alt="photo"
            className="w-8 min-w-8 aspect-square object-cover rounded-full bg-accent"
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
    accessorKey: "designation",
    header: "Designtion",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <RoleDropdown user={row.original} />,
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <SalaryCell user={row.original}/>
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => <FiredButton user={row.original} />,
  },
];
