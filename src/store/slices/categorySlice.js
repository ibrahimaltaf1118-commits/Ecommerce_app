// src/store/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminAPI } from "../../Services/adminAPI";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminAPI.get("/admin/categories");
      console.log("🟡 Category API Response:", response);
      console.log("🟡 Category Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("🔴 Category API Error:", error);
      console.error("🔴 Error Response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch categories"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await adminAPI.post("/admin/categories", categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, categoryData }, { rejectWithValue }) => {
    try {
      const response = await adminAPI.put(
        `/admin/categories/${id}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await adminAPI.delete(`/admin/categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        console.log("🟢 Categories fetched - Raw payload:", action.payload);

        // Handle different response formats and add path property
        let categoriesData = action.payload;

        if (Array.isArray(categoriesData)) {
          // Direct array from backend
          state.categories = categoriesData.map((category) => ({
            ...category,
            path: `/category/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          }));
          console.log("🟢 Processed categories with paths:", state.categories);
        } else if (categoriesData && Array.isArray(categoriesData.data)) {
          // Wrapped in data property
          state.categories = categoriesData.data.map((category) => ({
            ...category,
            path: `/category/${category.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          }));
          console.log(
            "🟢 Processed categories from data property:",
            state.categories
          );
        } else {
          console.warn("🔴 Unexpected categories format:", categoriesData);
          state.categories = [];
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("🔴 Categories fetch rejected:", action.payload);
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        // Add path to new category
        const newCategory = {
          ...action.payload,
          path: `/category/${action.payload.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
        };
        state.categories.push(newCategory);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          // Update path when category name changes
          state.categories[index] = {
            ...action.payload,
            path: `/category/${action.payload.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          };
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
