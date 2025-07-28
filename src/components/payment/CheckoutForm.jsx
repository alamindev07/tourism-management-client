
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = ({ booking }) => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axios = axiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");

    // Step 1: create payment intent
    const { data } = await axios.post("/api/create-payment-intent", {
      price: booking.price,
    });

    const clientSecret = data.clientSecret;

    // Step 2: confirm card payment
    const { paymentIntent, error: stripeError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: booking?.userName || "Anonymous",
            email: booking?.email,
          },
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    // Step 3: handle success
    if (paymentIntent.status === "succeeded") {
      const res = await axios.patch(
        `/api/bookings/payment-success/${booking._id}`,
        {
          transactionId: paymentIntent.id,
          email: booking.email,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: `Transaction ID: ${paymentIntent.id}`,
        confirmButtonText: "Go to My Bookings",
      }).then(() => navigate("/dashboard/bookings"));
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 shadow rounded-lg bg-white">
      <CardElement
        className="border p-3 rounded-md mb-4"
        options={{ style: { base: { fontSize: "16px" } } }}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className="btn btn-primary bg-green-600 w-full"
      >
        {processing ? "Processing..." : `Pay $${booking.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
