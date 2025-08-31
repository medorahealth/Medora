const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockTests = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    description: 'A blood test that measures several components and features of your blood',
    price: 500,
    category: 'Blood Test',
    image: '/images/tests/cbc.jpg'
  },
  {
    id: '2',
    name: 'Diabetes Screening',
    description: 'Tests for diabetes and prediabetes',
    price: 800,
    category: 'Diabetes',
    image: '/images/tests/diabetes.jpg'
  },
  {
    id: '3',
    name: 'Thyroid Function Test',
    description: 'Measures thyroid hormone levels',
    price: 1200,
    category: 'Thyroid',
    image: '/images/tests/thyroid.jpg'
  },
  {
    id: '4',
    name: 'Vitamin D Test',
    description: 'Measures vitamin D levels in blood',
    price: 1500,
    category: 'Vitamins',
    image: '/images/tests/vitamin-d.jpg'
  }
];

const mockWomenHealthTests = [
  {
    id: '5',
    name: 'Pap Smear',
    description: 'Cervical cancer screening test',
    price: 2000,
    category: 'Women Health',
    image: '/images/tests/pap-smear.jpg'
  },
  {
    id: '6',
    name: 'Breast Cancer Screening',
    description: 'Mammogram and breast examination',
    price: 3000,
    category: 'Women Health',
    image: '/images/tests/breast-cancer.jpg'
  }
];

// Routes
app.get('/tests', (req, res) => {
  res.json(mockTests);
});

app.get('/tests/women-health', (req, res) => {
  res.json(mockWomenHealthTests);
});

app.get('/tests/:id', (req, res) => {
  const test = [...mockTests, ...mockWomenHealthTests].find(t => t.id === req.params.id);
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ error: 'Test not found' });
  }
});

// Auth routes (mock)
app.post('/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'User registered successfully',
    user: { id: '1', email: req.body.email, name: req.body.name }
  });
});

app.post('/login', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login successful',
    token: 'mock-jwt-token',
    user: { id: '1', email: req.body.email, name: 'Test User' }
  });
});

// Session route for NextAuth
app.get('/auth/session', (req, res) => {
  res.json({ 
    user: { id: '1', email: 'test@example.com', name: 'Test User' },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
});

app.get('/auth/_log', (req, res) => {
  res.json({ success: true });
});

// Orders routes (mock)
app.post('/orders', (req, res) => {
  res.json({ 
    success: true, 
    orderId: 'order_' + Date.now(),
    message: 'Order created successfully'
  });
});

app.get('/orders/:id', (req, res) => {
  res.json({
    id: req.params.id,
    status: 'pending',
    tests: req.body.tests || [],
    totalAmount: 1500,
    createdAt: new Date().toISOString()
  });
});

// Razorpay routes (mock)
app.post('/razorpay/orders', (req, res) => {
  res.json({
    id: 'order_' + Date.now(),
    amount: req.body.amount,
    currency: 'INR',
    receipt: 'receipt_' + Date.now()
  });
});

app.post('/razorpay/verify', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Payment verified successfully' 
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /tests - Get all lab tests');
  console.log('- GET /tests/women-health - Get women health tests');
  console.log('- GET /tests/:id - Get specific test');
  console.log('- POST /register - Register user');
  console.log('- POST /login - Login user');
  console.log('- GET /auth/session - Get session info');
  console.log('- POST /orders - Create order');
  console.log('- GET /orders/:id - Get order');
  console.log('- POST /razorpay/orders - Create Razorpay order');
  console.log('- POST /razorpay/verify - Verify payment');
});
