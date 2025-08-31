// pages/tests/index.js
import React from "react";
import Head from "next/head";
import Link from "next/link";
import TestCard from "../../components/TestCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export async function getServerSideProps() {
  // Fetch lab tests from API (replace with your actual API URL)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tests`);
  const tests = await res.json();

  return {
    props: {
      tests,
    },
  };
}

function TestsPage({ tests }) {
  return (
    <div>
      <Head>
        <title>Kaustubh Labs - Lab Tests</title>
        <meta name="description" content="Browse our range of lab tests" />
      </Head>
      <Navbar />

      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Lab Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TestsPage;
