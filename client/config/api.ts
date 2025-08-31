// API configuration
const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,

    // Lab test endpoints
    GET_ALL_TESTS: `${API_BASE_URL}/tests`,
    GET_TEST: (id: string) => `${API_BASE_URL}/tests/${id}`,
    CREATE_TEST: `${API_BASE_URL}/tests`,
    UPDATE_TEST: (id: string) => `${API_BASE_URL}/tests/${id}`,

    // Order endpoints
    CREATE_ORDER: `${API_BASE_URL}/orders`,
    GET_ORDER: (id: string) => `${API_BASE_URL}/orders/${id}`,
    UPDATE_ORDER_STATUS: (id: string) => `${API_BASE_URL}/orders/${id}`,

    // Payment endpoints
    CREATE_RAZORPAY_ORDER: `${API_BASE_URL}/razorpay/orders`,
    VERIFY_RAZORPAY_PAYMENT: `${API_BASE_URL}/razorpay/verify`,
}; 