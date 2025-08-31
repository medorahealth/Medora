// data/healthCheckups.js

export const fullBodyCheckups = [
  {
    id: "fbc-1",
    name: "Full Body Checkup - Essential",
    description: "Comprehensive analysis of your body's vital health parameters",
    price: 6063,
    discountedPrice: 1499,
    discount: "75%",
    parameters: 91,
    reportTime: "7 hours",
    image: "/images/tests/full-body-checkup.jpg",
    category: "full_body"
  },
  {
    id: "fbc-2",
    name: "Orange Health Tax Saver Checkup",
    description: "Complete health assessment with tax benefits",
    price: 17993,
    discountedPrice: 5000,
    discount: "72%",
    parameters: 109,
    reportTime: "12 hours",
    image: "/images/tests/tax-saver.jpg",
    category: "full_body"
  },
  {
    id: "fbc-3",
    name: "Full Body Checkup - Advanced",
    description: "Advanced health screening with detailed analysis",
    price: 8433,
    discountedPrice: 2699,
    discount: "68%",
    parameters: 100,
    reportTime: "7 hours",
    image: "/images/tests/advanced-checkup.jpg",
    category: "full_body"
  },
  {
    id: "fbc-4",
    name: "Full Body Checkup - Comprehensive",
    description: "Complete health assessment with detailed reports",
    price: 12503,
    discountedPrice: 3699,
    discount: "70%",
    parameters: 105,
    reportTime: "12 hours",
    image: "/images/tests/comprehensive-checkup.jpg",
    category: "full_body"
  }
];

export const womenHealthCheckups = [
  {
    id: "whc-1",
    name: "Women Health Checkup - Essential",
    description: "Essential health screening for women",
    price: 5563,
    discountedPrice: 1599,
    discount: "71%",
    parameters: 71,
    reportTime: "12 hours",
    image: "/images/tests/women-health.jpg",
    category: "women_health"
  },
  {
    id: "whc-2",
    name: "Womens Health Checkup - Advanced",
    description: "Advanced health screening specifically designed for women",
    price: 11013,
    discountedPrice: 2699,
    discount: "75%",
    parameters: 97,
    reportTime: "12 hours",
    image: "/images/tests/women-advanced.jpg",
    category: "women_health"
  },
  {
    id: "whc-3",
    name: "Women Health Checkup - Comprehensive",
    description: "Complete women's health assessment",
    price: 14563,
    discountedPrice: 3799,
    discount: "74%",
    parameters: 100,
    reportTime: "12 hours",
    image: "/images/tests/women-comprehensive.jpg",
    category: "women_health"
  },
  {
    id: "whc-4",
    name: "PCOD Screening",
    description: "Comprehensive PCOD/PCOS screening",
    price: 3594,
    discountedPrice: 1499,
    discount: "58%",
    parameters: 35,
    reportTime: "12 hours",
    image: "/images/tests/pcod.jpg",
    category: "women_health"
  }
];

export const allergyPackages = [
  {
    id: "alg-1",
    name: "Complete Food Allergy(Immunocap)",
    description: "Comprehensive food allergy testing",
    price: 27250,
    discountedPrice: 25900,
    discount: "5%",
    parameters: 1,
    reportTime: "48 hours",
    image: "/images/tests/food-allergy.jpg",
    category: "allergy"
  },
  {
    id: "alg-2",
    name: "Food Intolerance Package - Comprehensive",
    description: "Complete food intolerance assessment",
    price: 29000,
    discountedPrice: 14999,
    discount: "48%",
    parameters: 188,
    reportTime: "48 hours",
    image: "/images/tests/food-intolerance.jpg",
    category: "allergy"
  }
];

export const diabetesPackages = [
  {
    id: "dia-1",
    name: "Diabetes Care Package - Essential",
    description: "Essential diabetes screening and monitoring",
    price: 2329,
    discountedPrice: 999,
    discount: "57%",
    parameters: 42,
    reportTime: "6 hours",
    image: "/images/tests/diabetes-care.jpg",
    category: "diabetes"
  },
  {
    id: "dia-2",
    name: "Diabetes Care Package - Advanced",
    description: "Advanced diabetes management and screening",
    price: 3369,
    discountedPrice: 1599,
    discount: "53%",
    parameters: 66,
    reportTime: "6 hours",
    image: "/images/tests/diabetes-advanced.jpg",
    category: "diabetes"
  }
];

export const healthCheckups = {
  categories: [
    {
      name: 'Full Body',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>`,
      packages: fullBodyCheckups
    },
    {
      name: 'Women Health',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>`,
      packages: womenHealthCheckups
    },
    {
      name: 'Allergy',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      packages: allergyPackages
    },
    {
      name: 'Diabetes',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>`,
      packages: diabetesPackages
    }
  ]
}; 