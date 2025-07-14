import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { FormWrapper } from "@/components/form-wrapper";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { taskTypes } from "@/constants";
import { useModalStore } from "@/hooks/use-modal-store";
import { workEntrySchema } from "@/validations";

const CreateWorkEntryModal = () => {
  const queryClient = useQueryClient();
  const { open, type, onClose } = useModalStore();
  const [isPending, setIsPending] = useState(false);

  const handleOpenChange = () => {
    if (!isPending) onClose();
  };

  const defaultValues = {
    task: "SUPPORT",
    hours: 4,
    date: new Date(),
  };

  const handleSuccess = (entry) => {
    queryClient.setQueryData(["work-entries"], (oldData) => {
      if (!oldData) return [entry];
      toast.success("Entry Created");
      return [entry, ...oldData];
    });

    onClose();
  };

  return (
    <Dialog
      open={open && type === "createWorkEntry"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="gap-0">
        <DialogHeader>
          <DialogTitle>Add New Work Entry</DialogTitle>
          <DialogDescription>
            Fill out the form to log your work.
          </DialogDescription>
        </DialogHeader>
        <FormWrapper
          insideModal
          setIsPending={setIsPending}
          actionLabel="Create"
          method="post"
          api="/work-entries"
          defaultValues={defaultValues}
          schema={workEntrySchema}
          onSuccess={handleSuccess}
        >
          {({ isPending, form }) => (
            <>
              <FormSelect
                control={form.control}
                name="task"
                disabled={isPending}
                options={taskTypes.map((t) => ({
                  label: t.label,
                  value: t.enum,
                }))}
              />
              <FormInput
                name="hours"
                control={form.control}
                placeholder="How many hours did you work?"
                type="number"
                disabled={isPending}
              />
              <FormDatePicker
                name="date"
                control={form.control}
                label="Date"
                disabled={isPending}
              />
            </>
          )}
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkEntryModal;
