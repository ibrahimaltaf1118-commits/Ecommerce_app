// src/store/slices/couponSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAPI } from "../../Services/adminAPI";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.get("/admin/coupons");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch coupons");
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await adminAPI.post("/admin/coupons", couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async ({ id, couponData }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.put(`/admin/coupons/${id}`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update coupon");
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (couponId, { rejectWithValue }) => {
    try {
      await adminAPI.delete(`/admin/coupons/${couponId}`);
      return couponId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
  }
);

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const { clearError } = couponSlice.actions;
export default couponSlice.reducer;
