import { request } from "@/lib/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { LoadingButton } from "./loading-button";
import { useModalStore } from "@/hooks/use-modal-store";

export function ConfirmModal() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { open, type, onClose, data = {} } = useModalStore();

  const {
    method = "delete",
    api,
    params,
    onSuccess,
    onError,
    showSuccessToast = true,
    showErrorToast = true,
    redirectUrlAfterSuccess,
    invalidateQueryKeys = [],
    title = "",
    description = "Are you absolutely sure? This action cannot be undone!",
  } = data;

  const { isPending, mutate } = useMutation({
    mutationFn: () => request({ method, url: api, data, params }),
    onSuccess: (data) => {
      onClose();
      if (onSuccess) onSuccess(data);
      if (showSuccessToast && data.message) toast.success(data.message);
      if (redirectUrlAfterSuccess) navigate(redirectUrlAfterSuccess);
      if (invalidateQueryKeys.length > 0)
        queryClient.invalidateQueries({ queryKey: invalidateQueryKeys });
    },
    onError: (error) => {
      if (onError) onError(error);
      if (showErrorToast && error.message) toast.error(error.message);
    },
  });

  const handleClose = () => {
    if (!isPending) onClose();
  };

  return (
    <Dialog open={open && type === "confirmModal"} onOpenChange={handleClose}>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button disabled={isPending} variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            isLoading={isPending}
            variant="destructive"
            onClick={mutate}
          >
            Confirm
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
