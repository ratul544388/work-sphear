import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { DollarSign } from "lucide-react";
import React from "react";

const CellPayButton = ({ employee }) => {
  const { salary, id } = employee;
  const { onOpen } = useModalStore();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onOpen("payroll", { salary, employeeId: id })}
    >
      <DollarSign className="size-4" />
      Pay
    </Button>
  );
};

export default CellPayButton;
