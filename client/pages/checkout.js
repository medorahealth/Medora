// pages/checkout.js
import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CheckoutPage() {
  return (
    <div>
      <Head>
        <title>Kaustubh Labs - Checkout</title>
        <meta
          name="description"
          content="Review your order and proceed to payment"
        />
      </Head>
      <Navbar />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        {/* Display cart items, total amount, customer information form, etc. */}
        {/* Add "Proceed to Payment" button */}
      </main>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
