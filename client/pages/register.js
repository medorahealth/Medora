// pages/register.js
import React from "react";
import Head from "next/head";
import RegistrationForm from "../components/RegistrationForm.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RegistrationPage() {
  return (
    <div>
      <Head>
        <title>Kaustubh Labs - Register</title>
        <meta name="description" content="Create a new Kaustubh Labs account" />
      </Head>
      <Navbar />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <RegistrationForm />
      </main>

      <Footer />
    </div>
  );
}

export default RegistrationPage;
