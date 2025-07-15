import { request } from "@/lib/request";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { LoadingButton } from "./loading-button";
import { Form } from "./ui/form";

export function FormWrapper({
  schema,
  api,
  method = "post",
  onSuccess,
  onError,
  children,
  className,
  redirectUrlAfterSuccess,
  showSuccessToast = true,
  showErrorToast = true,
  defaultValues,
  actionLabel,
  title,
  description,
  params = {},
  invalidateQueryKeys = [],
  insideModal = false,
  setIsPending,
  formResetAfterSuccess,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      return await request({
        method,
        url: api,
        data: values,
        params,
      });
    },
    onSuccess: (data) => {
      if (formResetAfterSuccess) form.reset();
      if (showSuccessToast && data.message) toast.success(data.message);
      if (onSuccess) onSuccess(data);
      if (redirectUrlAfterSuccess) {
        navigate(redirectUrlAfterSuccess);
      }
      if (invalidateQueryKeys.length > 0) {
        queryClient.invalidateQueries({ queryKey: invalidateQueryKeys });
      }
    },
    onError: (error) => {
      if (showErrorToast) {
        toast.error(error.message || "Something went wrong");
      }
      if (onError) {
        onError(error);
      }
    },
    onMutate: () => setIsPending?.(true),
    onSettled: () => setIsPending?.(false),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(mutate)}
        className={cn(
          "flex flex-col gap-6 shadow-md w-full max-w-[500px] bg-background border rounded-lg p-5",
          insideModal && "shadow-none p-0 border-none max-w-full",
          className
        )}
      >
        <div className="mb-3">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground text-pretty">
              {description}
            </p>
          )}
        </div>
        {children({ isPending, form })}
        {actionLabel && (
          <LoadingButton isLoading={isPending} className="w-full">
            {actionLabel}
          </LoadingButton>
        )}
      </form>
    </Form>
  );
}
