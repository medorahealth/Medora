import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";
import TestCard from "../components/TestCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = [
  {
    name: 'Full Body',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`,
    category: 'full_body'
  },
  {
    name: 'Women Health',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>`,
    category: 'women_health'
  },
  {
    name: 'Allergy',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    category: 'allergy'
  },
  {
    name: 'Diabetes',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>`,
    category: 'diabetes'
  }
];

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('Full Body');
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tests');
        if (!response.ok) {
          throw new Error('Failed to fetch tests');
        }
        const data = await response.json();
        setTests(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching tests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const getTestsByCategory = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return [];
    return tests.filter(test => test.category === category.category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Health Checkups & Lab Tests | Book Lab Tests From Home</title>
        <meta name="description" content="Book lab tests and health checkups from home with free sample collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="pb-8">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Book Your Health Checkup
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get comprehensive health checkups with free home sample collection
              </p>
              <div className="max-w-lg mx-auto">
                <form className="flex items-center bg-white rounded-lg shadow-sm p-2">
                  <input
                    type="text"
                    placeholder="Search for health checkups..."
                    className="flex-1 px-4 py-2 outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`category-button flex-shrink-0 ${
                    activeCategory === category.name ? 'active' : ''
                  }`}
                >
                  <div 
                    className="w-5 h-5"
                    dangerouslySetInnerHTML={{ __html: category.icon }}
                  />
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {getTestsByCategory(activeCategory).map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section bg-white mt-6">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="feature-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3>Free Home Collection</h3>
                <p>Get your samples collected at home for free</p>
              </div>
              <div className="feature-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3>Digital Reports</h3>
                <p>Get your test results online within 24-48 hours</p>
              </div>
              <div className="feature-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3>Free Doctor Consultation</h3>
                <p>Get free consultation with experienced doctors</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .hero-section {
          background: linear-gradient(to right, #fff5f5, #fff);
        }

        .category-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 100px;
          background: white;
          border: 1px solid #e5e7eb;
          white-space: nowrap;
          transition: all 0.2s;
          font-size: 0.875rem;
          min-width: fit-content;
          cursor: pointer;
        }

        .category-button svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .category-button.active {
          background: #FF4B4B;
          color: white;
          border-color: #FF4B4B;
        }

        .category-button.active svg {
          color: white;
        }

        .feature-card {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          margin: 0 auto 12px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF4B4B;
          flex-shrink: 0;
        }

        .feature-card h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 6px;
          color: #1a1a1a;
        }

        .feature-card p {
          color: #666;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default HomePage;