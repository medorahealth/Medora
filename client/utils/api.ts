import { API_ENDPOINTS } from '../config/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Something went wrong');
    }
    return response.json();
};

// API utility functions
export const api = {
    // Auth functions
    login: async (email: string, password: string) => {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    register: async (userData: any) => {
        const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return handleResponse(response);
    },

    // Lab test functions
    getAllTests: async (token: string) => {
        const response = await fetch(API_ENDPOINTS.GET_ALL_TESTS, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    getTest: async (id: string, token: string) => {
        const response = await fetch(API_ENDPOINTS.GET_TEST(id), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    createTest: async (testData: any, token: string) => {
        const response = await fetch(API_ENDPOINTS.CREATE_TEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(testData),
        });
        return handleResponse(response);
    },

    updateTest: async (id: string, testData: any, token: string) => {
        const response = await fetch(API_ENDPOINTS.UPDATE_TEST(id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(testData),
        });
        return handleResponse(response);
    },

    // Order functions
    createOrder: async (orderData: any, token: string) => {
        const response = await fetch(API_ENDPOINTS.CREATE_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });
        return handleResponse(response);
    },

    getOrder: async (id: string, token: string) => {
        const response = await fetch(API_ENDPOINTS.GET_ORDER(id), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return handleResponse(response);
    },

    // Payment functions
    createRazorpayOrder: async (orderData: any, token: string) => {
        const response = await fetch(API_ENDPOINTS.CREATE_RAZORPAY_ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });
        return handleResponse(response);
    },

    verifyRazorpayPayment: async (paymentData: any, token: string) => {
        const response = await fetch(API_ENDPOINTS.VERIFY_RAZORPAY_PAYMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(paymentData),
        });
        return handleResponse(response);
    },
}; 