import React from 'react';
import TestCard from '../components/TestCard';
import Navbar from '../components/Navbar';
import { healthCheckups } from '../data/healthCheckups';

export default function WomenHealth({ packages }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pb-8">
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Women's Health Packages</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const womenHealthPackages = healthCheckups.categories.find(
      category => category.name === 'Women Health'
    )?.packages || [];

    return {
      props: {
        packages: womenHealthPackages,
      },
    };
  } catch (error) {
    console.error('Error fetching women health packages:', error);
    return {
      props: {
        packages: [],
      },
    };
  }
} 