import Modal from "@/components/modal";
import { useModalStore } from "@/hooks/use-modal-store";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { useState } from "react";

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`, // optional redirect
      },
      redirect: "if_required", // prevents auto redirect
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent?.status === "succeeded") {
      onClose();
      // Optionally show success toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
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
