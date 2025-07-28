// src/pages/PaymentPage.jsx
import React from "react";
import StripeProvider from "../components/payment/StripeProvider";
import CheckoutForm from "../components/payment/CheckoutForm";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) return <p>No booking data!</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Payment</h1>
      <StripeProvider>
        <CheckoutForm booking={booking} />
      </StripeProvider>
    </div>
  );
};

export default PaymentPage;
