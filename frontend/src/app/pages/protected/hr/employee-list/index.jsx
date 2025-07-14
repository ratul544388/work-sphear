import Error from "@/app/error";
import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "./components/columns";
import PaySalaryModal from "./components/pay-salary-modal";
import PageHeader from "@/components/page-header";

const EmployeeList = () => {
  const { data: employees = [], isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => request({ url: "/hr/employees" }),
  });

  return (
    <>
      <Title>Employees</Title>
      <PageHeader label="Employee List" className="mb-4"/>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={employees} />
      )}
      <PaySalaryModal />
    </>
  );
};

export default EmployeeList;
