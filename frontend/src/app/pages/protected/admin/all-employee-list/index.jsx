import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import { ConfirmModal } from "@/components/confirm-modal";

const AllEmployeeList = () => {
  const { data: employees = [], isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => request({ url: "/users/employees/all" }),
  });

  return (
    <>
      <Title>Employee List</Title>
      <PageHeader label="Employee List" className="mb-4" />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
      <ConfirmModal />
    </>
  );
};

export default AllEmployeeList;
