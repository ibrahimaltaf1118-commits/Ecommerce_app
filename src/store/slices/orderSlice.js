import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { orderAPI } from "../../Services/api";

// ===================================================================================
// ASYNC THUNKS
// ===================================================================================

// --- Admin Thunks ---

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getAllOrders(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const confirmPacking = createAsyncThunk(
  "orders/confirmPacking",
  async ({ orderId, adminId }, { rejectWithValue }) => {
    try {
      const response = await orderAPI.confirmPacking(orderId, { adminId });
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm packing."
      );
    }
  }
);

export const dispatchOrder = createAsyncThunk(
  "orders/dispatchOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderAPI.dispatchOrder(orderId);
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to dispatch order."
      );
    }
  }
);

// --- Customer / Shared Thunks ---

export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/orders/myorders");
      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch my orders"
      );
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  }
);

// ===================================================================================
// SLICE DEFINITION
// ===================================================================================

// Helper function to update an order in both the list and the current selection
const updateOrderInState = (state, updatedOrder) => {
  // Update the order in the main admin list
  const index = state.orders.findIndex(
    (order) => order._id === updatedOrder._id
  );
  if (index !== -1) {
    state.orders[index] = updatedOrder;
  }
  // Also update the currently viewed order if it matches
  if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
    state.currentOrder = updatedOrder;
  }
};

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    myOrders: [],
    totalOrders: 0,
    totalPages: 1,
    currentPage: 1,
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch All Orders (Admin) ---
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        const { orders, total, totalPages, currentPage } = action.payload;
        state.orders = orders;
        state.totalOrders = total;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
      })

      // --- Fetch My Orders (Customer) ---
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.myOrders = [];
      })

      // --- Fetch Order By ID (Shared) ---
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentOrder = null;
      })

      // --- Admin Update Actions (Packing & Dispatch) ---
      .addCase(confirmPacking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPacking.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload); // Use helper
      })
      .addCase(confirmPacking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(dispatchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dispatchOrder.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload); // Use helper
      })
      .addCase(dispatchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
