import { LoadingButton } from "@/components/loading-button";
import { useModalStore } from "@/hooks/use-modal-store";
import { request } from "@/lib/request";
import { useMutation } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { toast } from "sonner";

const PayButton = ({ payroll }) => {
  const { onOpen } = useModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      request({
        method: "post",
        url: "/payrolls/create-payment-intent",
        data: { payrollId: payroll.id },
      }),
    onSuccess: ({ clientSecret }) => {
      onOpen("payment", { clientSecret });
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });

  return (
    <LoadingButton
      disabled={payroll.paidAt}
      isLoading={isPending}
      variant="outline"
      size="sm"
      onClick={mutate}
    >
      <DollarSign className="size-4" />
      Pay
    </LoadingButton>
  );
};

export default PayButton;
