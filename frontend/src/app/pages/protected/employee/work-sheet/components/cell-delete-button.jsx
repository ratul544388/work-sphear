import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React from "react";

const CellDeleteButton = ({ workEntry }) => {
  const { onOpen } = useModalStore();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.setQueryData(["work-entries"], (oldData) => {
      return oldData.filter((item) => item.id !== workEntry.id);
    });
  };

  const data = {
    api: `/work-entries/${workEntry.id}`,
    params: { id: workEntry.id },
    title: "Delete Work Entry",
    description: "Are you absolutely sure? This action cannot be undone",
    onSuccess: handleSuccess,
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onOpen("confirmModal", data)}
    >
      <Trash className="size-4 text-destructive" />
    </Button>
  );
};

export default CellDeleteButton;
