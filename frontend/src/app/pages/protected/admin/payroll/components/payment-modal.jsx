import { LoadingButton } from "@/components/loading-button";
import Modal from "@/components/modal";
import { useModalStore } from "@/hooks/use-modal-store";
import { stripePromise } from "@/lib/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const CheckoutForm = ({ onClose }) => {
  const queryClient = useQueryClient();
  const stripe = useStripe();
  const elements = useElements();

  const { mutate, isPending } = useMutation({
    mutationFn: async (e) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) throw new Error(error.message || "Payment failed");
      if (paymentIntent?.status !== "succeeded")
        throw new Error("Payment not successful");

      return paymentIntent;
    },
    onSuccess: async () => {
      toast.success("Payment succeeded. Updating status...");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      queryClient.invalidateQueries(["payrolls"]);
      toast.success("Payroll marked as paid.");
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <form onSubmit={mutate} className="flex flex-col gap-4">
      <PaymentElement />
      <LoadingButton
        className="ml-auto"
        type="submit"
        disabled={!stripe}
        isLoading={isPending}
      >
        Pay Now
      </LoadingButton>
    </form>
  );
};

export const PaymentModal = () => {
  const { open, type, onClose, data = {} } = useModalStore();

  const { clientSecret } = data;

  return (
    <Modal
      open={open && type === "payment"}
      onOpenChange={onClose}
      title="Payment"
      description="Complete your payment"
    >
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onClose={onClose} />
        </Elements>
      )}
    </Modal>
  );
};

export default PaymentModal;
