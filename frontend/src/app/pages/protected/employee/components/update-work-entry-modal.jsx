import { useState, useEffect } from "react";
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

const UpdateWorkEntryModal = () => {
  const queryClient = useQueryClient();
  const { open, onClose, data, type } = useModalStore(); // data should include { workEntry }
  const [isPending, setIsPending] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    task: "",
    hours: "",
    date: undefined,
  });

  const workEntry = data?.workEntry;

  useEffect(() => {
    if (workEntry) {
      const { task, date, hours } = workEntry;
      setDefaultValues({ task, date: new Date(date), hours });
    }
  }, [workEntry]);

  const handleOpenChange = () => {
    if (!isPending) onClose();
  };

  const handleSuccess = (entry) => {
    queryClient.setQueryData(["work-entries"], (oldData) => {
      if (!oldData) return [];

      toast.success("Entry Updated");

      return oldData.map((item) =>
        item.id === entry.id ? { ...item, ...entry } : item
      );
    });

    onClose();
  };

  return (
    <Dialog
      open={open && type === "updateWorkEntry"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="gap-0">
        <DialogHeader>
          <DialogTitle>Update Work Entry</DialogTitle>
          <DialogDescription>
            Make changes to your existing record.
          </DialogDescription>
        </DialogHeader>
        <FormWrapper
          insideModal
          setIsPending={setIsPending}
          actionLabel="Update"
          method="put"
          api={`/work-entries/${workEntry?.id}`}
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

export default UpdateWorkEntryModal;
