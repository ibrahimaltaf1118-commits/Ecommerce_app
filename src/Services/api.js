// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Public API (no auth required)
export const publicAPI = axios.create({
  baseURL: API_URL,
});

// Protected API (with auth)
export const protectedAPI = axios.create({
  baseURL: API_URL,
});

// Add token to protected requests
protectedAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// -------------------------------------------------------------------
// 1. Product API functions
// -------------------------------------------------------------------
export const productAPI = {
  // Public endpoints
  getAllProducts: () => publicAPI.get("/products"),
  getProduct: (id) => publicAPI.get(`/products/${id}`),
  getFeaturedProducts: () => publicAPI.get("/products/featured"),
  getNewArrivals: () => publicAPI.get("/products/new"),
  getSaleProducts: () => publicAPI.get("/products/sale"),
  getProductsByCategory: (category) =>
    publicAPI.get(`/products/category/${category}`), // Admin endpoints

  createProduct: (productData) =>
    protectedAPI.post("/products/addProduct", productData),
  updateProduct: (id, productData) =>
    protectedAPI.put(`/products/${id}`, productData),
  deleteProduct: (id) => protectedAPI.delete(`/products/${id}`),
};

// -------------------------------------------------------------------
// 2. Order API functions (Includes NEW confirmPacking)
// -------------------------------------------------------------------
export const orderAPI = {
  // Customer endpoints
  createOrder: (orderData) => protectedAPI.post("/orders", orderData),
  getMyOrders: () => protectedAPI.get("/orders/my-orders"),
  getOrder: (id) => protectedAPI.get(`/orders/${id}`), // Admin endpoints

  getAllOrders: (params) => protectedAPI.get("/orders", { params }), // 🚀 NEW: Confirms the packing status of an order
  confirmPacking: (id, data) =>
    protectedAPI.patch(`/orders/${id}/confirm-packing`, data),

  updateOrderStatus: (id, status) =>
    protectedAPI.patch(`/orders/${id}/status`, { status }),
  updatePaymentStatus: (id, paymentStatus) =>
    protectedAPI.patch(`/orders/${id}/payment-status`, { paymentStatus }),
  deleteOrder: (id) => protectedAPI.delete(`/orders/${id}`),
};

// -------------------------------------------------------------------
// 3. Admin API functions
// -------------------------------------------------------------------
export const adminAPI = {
  getDashboardData: () => protectedAPI.get("/admin/dashboard"),
  getAnalytics: (dateRange) =>
    protectedAPI.get("/admin/analytics", { params: { dateRange } }),
};

// -------------------------------------------------------------------
// 4. Customer/User Management API functions
// -------------------------------------------------------------------
export const customerAPI = {
  // Admin endpoints (for managing customers)
  getAllCustomers: () => protectedAPI.get("/admin/customers"),
  getCustomer: (id) => protectedAPI.get(`/admin/customers/${id}`),
  updateCustomer: (id, data) =>
    protectedAPI.put(`/admin/customers/${id}`, data),
  deleteCustomer: (id) => protectedAPI.delete(`/admin/customers/${id}`),
  createCustomer: (data) => protectedAPI.post("/admin/customers", data), // Customer analytics

  getCustomerStats: () => protectedAPI.get("/admin/customers/stats"),
  getCustomerOrders: (id) => protectedAPI.get(`/admin/customers/${id}/orders`),
};
