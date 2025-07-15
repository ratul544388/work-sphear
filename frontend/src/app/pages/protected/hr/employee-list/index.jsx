import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import PayrollModal from "./components/payroll-modal";

const EmployeeList = () => {
  const { data: employees = [], isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => request({ url: "/users/employees" }),
  });

  return (
    <>
      <Title>Employees</Title>
      <PageHeader label="Employee List" className="mb-4" />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
      <PayrollModal />
    </>
  );
};

export default EmployeeList;
