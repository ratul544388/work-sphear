import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { cn } from "@/lib/utils";

const Modal = ({
  open,
  onOpenChange,
  title = "",
  description = "",
  children,
  className = "",
  disabled,
}) => {
  const handleOpenChange = (open) => {
    if (!disabled) onOpenChange(open);
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn('', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto overflow-clip">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
