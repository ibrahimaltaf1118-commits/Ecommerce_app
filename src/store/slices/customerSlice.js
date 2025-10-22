import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customerAPI } from "../../Services/api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await customerAPI.getAllCustomers();
      console.log("🟡 Customers API Response:", response);
      return response.data;
    } catch (error) {
      console.error("🔴 Customers API Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch customers"
      );
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await customerAPI.updateCustomer(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update customer"
      );
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (customerId, { rejectWithValue }) => {
    try {
      await customerAPI.deleteCustomer(customerId);
      return customerId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete customer"
      );
    }
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState: {
    customers: [],
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
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;

        let customersData = action.payload;

        // Handle different response formats
        if (Array.isArray(customersData)) {
          state.customers = customersData;
        } else if (customersData && Array.isArray(customersData.data)) {
          state.customers = customersData.data;
        } else {
          console.warn("Unexpected customers format:", customersData);
          state.customers = [];
        }
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (customer) => customer._id === action.payload._id
        );
        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.payload
        );
      });
  },
});

export const { clearError } = customerSlice.actions;
export default customerSlice.reducer;
