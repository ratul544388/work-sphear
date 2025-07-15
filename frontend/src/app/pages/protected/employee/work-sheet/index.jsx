import { DataTable } from "@/components/data-table";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { request } from "@/lib/request";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { columns } from "./components/columns";
import CreateWorkEntryModal from "./components/create-work-entry-modal";
import UpdateWorkEntryModal from "./components/update-work-entry-modal";
import { ConfirmModal } from "@/components/confirm-modal";
import PageTitle from "@/components/page-title";

const WorkSheet = () => {
  const { onOpen } = useModalStore();

  const { isPending, data: workEntries = [] } = useQuery({
    queryKey: ["work-entries"],
    queryFn: () => request({ url: "/work-entries" }),
  });

  return (
    <div className="flex flex-col">
      <Title>Work Sheet</Title>
      <div className="flex items-center py-4 mb-4 border-b">
        <PageTitle>Work Entries</PageTitle>
        <Button onClick={() => onOpen("createWorkEntry")} className="ml-auto">
          <PlusCircle className="size-4" />
          Add a new entry
        </Button>
      </div>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={workEntries} />
      )}
      <CreateWorkEntryModal />
      <UpdateWorkEntryModal />
      <ConfirmModal />
    </div>
  );
};

export default WorkSheet;
