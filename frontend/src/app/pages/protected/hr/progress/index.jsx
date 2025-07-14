import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "./components/columns";
import { request } from "@/lib/request";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import { useSearchParams } from "react-router";
import PageTitle from "@/components/page-title";
import ClearFilterButton from "@/components/clear-filter-button";

const Progress = () => {
  const [searchParams] = useSearchParams();
  const task = searchParams.get("task");
  const employeeName = searchParams.get("employee_name");
  const month = searchParams.get("month");
  const { data: workEntries = [], isPending } = useQuery({
    queryKey: ["progress", task, employeeName, month],
    queryFn: () =>
      request({
        url: "/work-entries",
        params: { task, employee_name: employeeName, month },
      }),
  });

  return (
    <>
      <div className="flex items-center py-4 mb-4 border-b justify-between flex-wrap">
        <PageTitle>Employee Work Progress</PageTitle>
        <ClearFilterButton />
      </div>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={workEntries} />
      )}
    </>
  );
};

export default Progress;
