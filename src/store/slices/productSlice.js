// src/store/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "../../Services/api";

// =============================
// 📡 Async Thunks
// =============================

// 🛍 Fetch All Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🟡 Redux - Fetching products from API...");
      const response = await productAPI.getAllProducts();

      console.log("🟢 Redux - Full API Response:", response);
      console.log("🟢 Redux - Response Data:", response.data);

      let productsData = response.data;

      if (
        productsData &&
        productsData.data &&
        Array.isArray(productsData.data)
      ) {
        console.log(
          "🟢 Redux - Using products from data property:",
          productsData.data.length
        );
        return productsData.data;
      } else if (Array.isArray(productsData)) {
        console.log("🟢 Redux - Using direct array:", productsData.length);
        return productsData;
      } else if (productsData && Array.isArray(productsData.products)) {
        console.log(
          "🟢 Redux - Using products from products property:",
          productsData.products.length
        );
        return productsData.products;
      } else if (productsData && typeof productsData === "object") {
        console.log("🟢 Redux - Single product object, wrapping in array");
        return [productsData];
      } else {
        console.warn("🔴 Redux - Unexpected response format:", productsData);
        return [];
      }
    } catch (error) {
      console.error("🔴 Redux - API Error:", error);
      console.error("🔴 Redux - Error Response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

// 📦 Fetch Product By ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productAPI.getProduct(productId);
      let productData = response.data;

      if (productData && productData.data) {
        return productData.data;
      } else if (productData && typeof productData === "object") {
        return productData;
      } else {
        throw new Error("Invalid product response format");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ➕ Create Product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productAPI.createProduct(productData);
      let createdProduct = response.data;

      if (createdProduct && createdProduct.data) {
        return createdProduct.data;
      } else if (createdProduct && typeof createdProduct === "object") {
        return createdProduct;
      } else {
        return createdProduct;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// ✏️ Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productAPI.updateProduct(id, data);
      let updatedProduct = response.data;

      if (updatedProduct && updatedProduct.data) {
        return updatedProduct.data;
      } else if (updatedProduct && typeof updatedProduct === "object") {
        return updatedProduct;
      } else {
        return updatedProduct;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// 🗑 Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await productAPI.deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// =============================
// 🧠 Slice
// =============================
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    filters: {
      search: "",
      category: "",
      status: "",
      minPrice: "",
      maxPrice: "",
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearProducts: (state) => {
      state.products = [];
    },
    debugState: (state) => {
      console.log("🔍 Redux Debug - Current State:", {
        products: state.products,
        loading: state.loading,
        error: state.error,
        productsCount: state.products.length,
        productsType: typeof state.products,
        isArray: Array.isArray(state.products),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        console.log("🟡 Redux - Fetch products pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("🟢 Redux - Fetch products fulfilled:", action.payload);
        state.loading = false;
        state.products = action.payload || [];
        state.error = null;
        state.pagination.total = action.payload?.length || 0;
        state.pagination.pages = Math.ceil(
          (action.payload?.length || 0) / state.pagination.limit
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log("🔴 Redux - Fetch products rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })

      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.products.unshift(action.payload);
        }
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload._id) {
          const index = state.products.findIndex(
            (product) => product._id === action.payload._id
          );
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearCurrentProduct,
  setPagination,
  clearProducts,
  debugState,
} = productSlice.actions;

export default productSlice.reducer;
