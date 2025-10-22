// src/Services/adminAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create a single, configured axios instance for all admin requests
const adminAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Use interceptors to attach the auth token and handle logging/errors
adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(
      `🟡 Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("🔴 Request interceptor error:", error);
    return Promise.reject(error);
  }
);

adminAPI.interceptors.response.use(
  (response) => {
    console.log(
      `🟢 Response from: ${response.config.url} | Status: ${response.status}`
    );
    return response;
  },
  (error) => {
    console.error("🔴 Response error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// ===================================================================================
// ✨ API SERVICE OBJECTS ✨
// ===================================================================================

// --- Product Management ---
export const productAPI = {
  getAllProducts: (params) => adminAPI.get("/products", { params }),
  getProductById: (id) => adminAPI.get(`/products/${id}`),
  // Note: Creating/updating with images requires FormData
  createProduct: (productData) =>
    adminAPI.post("/admin/products/new", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  updateProduct: (id, productData) =>
    adminAPI.put(`/admin/products/${id}`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteProduct: (id) => adminAPI.delete(`/admin/products/${id}`),
};

// --- Category Management ---
export const categoryAPI = {
  getAllCategories: () => adminAPI.get("/categories"),
  createCategory: (categoryData) =>
    adminAPI.post("/admin/categories/new", categoryData),
  deleteCategory: (id) => adminAPI.delete(`/admin/categories/${id}`),
};

// --- Order Management ---
export const orderAPI = {
  // Handles pagination, search, and sorting via query params
  getAllOrders: (params) => adminAPI.get("/admin/orders", { params }),
  getOrderById: (id) => adminAPI.get(`/admin/orders/${id}`),

  // Specific actions from your slice
  confirmPacking: (orderId, { adminId }) =>
    adminAPI.post(`/admin/orders/confirm-packing/${orderId}`, { adminId }),

  // The dispatch route you created
  dispatchOrder: (orderId) => adminAPI.post(`/dispatch/${orderId}`),

  // Generic status update
  updateOrderStatus: (id, status) =>
    adminAPI.put(`/admin/orders/${id}`, { status }),
  deleteOrder: (id) => adminAPI.delete(`/admin/orders/${id}`),
};

// You can still export the base instance if needed elsewhere
export { adminAPI };
