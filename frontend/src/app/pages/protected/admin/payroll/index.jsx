import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "./components/columns";
import PaymentModal from "./components/payment-modal";

const Payroll = () => {
  const { isPending, data: payrolls } = useQuery({
    queryKey: ["payrolls"],
    queryFn: () => request({ url: "/payrolls" }),
  });


  return (
    <div className="space-y-4">
      <Title>Payroll</Title>
      <PageHeader label="Payroll" />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={payrolls} />
      )}
      <PaymentModal/>
    </div>
  );
};

export default Payroll;
