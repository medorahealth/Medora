// pages/dashboard/orders.js
import React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react'; // Import NextAuth
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function OrdersPage() {
  const { data: session, status } = useSession(); // Get Session Data
  const router = useRouter(); // Get Router

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div>
      <Head>
        <title>Kaustubh Labs - Orders</title>
        <meta name="description" content="Manage customer orders" />
      </Head>
      <Navbar />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Order Management</h1>
        {/* Display order data, status updates, etc. */}
      </main>

      <Footer />
    </div>
  );
}

export default OrdersPage;