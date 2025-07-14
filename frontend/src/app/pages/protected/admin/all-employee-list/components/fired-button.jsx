import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const FiredButton = ({ user }) => {
  const queryClient = useQueryClient();
  const { onOpen } = useModalStore();
  const { id, isFired, name } = user;

  const handleSuccess = () => {
    console.log("called");
    queryClient.setQueryData(["employees"], (oldData) => {
      return oldData.map((e) => (e.id === id ? { ...e, isFired: true } : e));
    });
  };

  return (
    <Button
      disabled={isFired}
      onClick={() =>
        onOpen("confirmModal", {
          api: `/admin/employees/${id}/fire`,
          method: "patch",
          title: `Fire ${name}`,
          onSuccess: handleSuccess,
        })
      }
      variant="outline"
      className={cn("", isFired && "text-destructive")}
    >
      {isFired ? "Fired" : "Fire"}
    </Button>
  );
};

export default FiredButton;
