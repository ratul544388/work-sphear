import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { Edit } from "lucide-react";
import React from "react";

const CellEditButton = ({ workEntry }) => {
  const { onOpen } = useModalStore();
  return (
    <Button
      onClick={() => onOpen("updateWorkEntry", { workEntry })}
      variant="outline"
      size="icon"
    >
      <Edit className="size-4" />
    </Button>
  );
};

export default CellEditButton;
