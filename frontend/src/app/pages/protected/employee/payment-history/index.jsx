import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { useAuthStore } from "@/hooks/use-auth-store";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./components/columns";
import { useSearchParams } from "react-router";

const PaymentHistory = () => {
  const { user } = useAuthStore();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { data = {}, isPending } = useQuery({
    queryKey: ["payrolls", page],
    queryFn: () => request({ url: `/payrolls/${user.id}`, params: { page } }),
  });

  const { payrolls, totalItems } = data;

  return (
    <div className="space-y-4">
      <Title>Payment History</Title>
      <PageHeader label="Payment History" />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={payrolls} dataCount={totalItems} />
      )}
    </div>
  );
};

export default PaymentHistory;
