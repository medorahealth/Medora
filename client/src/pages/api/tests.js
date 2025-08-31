export async function GET() {
  try {
    // Fetch tests from the backend server
    const response = await fetch('http://localhost:8080/tests');
    
    if (!response.ok) {
      throw new Error('Failed to fetch tests');
    }
    
    const tests = await response.json();
    
    return new Response(JSON.stringify(tests), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching tests:', error);
    
    // Return mock data if backend is not available
    const mockTests = [
      {
        id: '1',
        name: 'Complete Blood Count (CBC)',
        description: 'A blood test that measures several components and features of your blood',
        price: 500,
        discountedPrice: 400,
        category: 'full_body',
        parameters: 24,
        reportTime: '24 hours',
        discount: '20% OFF',
        image: '/images/tests/cbc.jpg'
      },
      {
        id: '2',
        name: 'Diabetes Screening',
        description: 'Tests for diabetes and prediabetes',
        price: 800,
        discountedPrice: 600,
        category: 'diabetes',
        parameters: 12,
        reportTime: '24 hours',
        discount: '25% OFF',
        image: '/images/tests/diabetes.jpg'
      },
      {
        id: '3',
        name: 'Thyroid Function Test',
        description: 'Measures thyroid hormone levels',
        price: 1200,
        discountedPrice: 900,
        category: 'full_body',
        parameters: 8,
        reportTime: '24 hours',
        discount: '25% OFF',
        image: '/images/tests/thyroid.jpg'
      },
      {
        id: '4',
        name: 'Vitamin D Test',
        description: 'Measures vitamin D levels in blood',
        price: 1500,
        discountedPrice: 1200,
        category: 'full_body',
        parameters: 1,
        reportTime: '24 hours',
        discount: '20% OFF',
        image: '/images/tests/vitamin-d.jpg'
      }
    ];
    
    return new Response(JSON.stringify(mockTests), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
