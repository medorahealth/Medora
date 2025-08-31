// pages/payment.js
import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PaymentPage() {
  return (
    <div>
      <Head>
        <title>Kaustubh Labs - Payment</title>
        <meta name="description" content="Securely process your payment" />
      </Head>
      <Navbar />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Payment</h1>
        {/* Integrate Stripe, PayPal, or Razorpay here */}
      </main>

      <Footer />
    </div>
  );
}

export default PaymentPage;
