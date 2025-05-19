// src/redux/slices/credentialsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { errorMessage } from "@/helper/errorResponse";

// Async thunk to add credentials
export const addCredentials = createAsyncThunk(
  "credentials/addCredentials",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/addCredentials", formData);
      toast.success("Credentials added successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to add credentials. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

// Async thunk to fetch credentials
export const getCredentials = createAsyncThunk(
  "credentials/getCredentials",
  async ({ level, search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/getCredentials", {
        params: { level, search, page, limit },
      });
      // console.log(response);

      return {
        data: response.data.data,
        total: response.data.pagination.total,
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
        limit: response.data.pagination.limit,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to fetch credentials. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

// Async thunk to edit credentials
export const editCredentials = createAsyncThunk(
  "credentials/editCredentials",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("edit cred");

      const response = await api.post("/editCredentials", formData);
      toast.success("Credentials updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to update credentials. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

// Async thunk to delete credentials
export const deleteCredentials = createAsyncThunk(
  "credentials/deleteCredentials",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/deleteCredentials/${id}`);
      toast.success("Credentials deleted successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to delete credentials. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const changePassword = createAsyncThunk(
  "credentials/changePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/changePassword", formData)
      toast.success("Credentials updated successfully!");
      return response.data;
      
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to delete credentials. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

const initialState = {
  credentials: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  limit: 5,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Credentials
      .addCase(addCredentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.credentials.push(action.payload);
      })
      .addCase(addCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Get Credentials
      .addCase(getCredentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.credentials = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.limit = action.payload.limit;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Edit Credentials
      .addCase(editCredentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.credentials.findIndex(
          (cred) => cred.id === action.payload.id
        );
        if (index !== -1) {
          state.credentials[index] = action.payload;
        }
      })
      .addCase(editCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.credentials.findIndex(
          (cred) => cred.id === action.payload.id
        );
        if (index !== -1) {
          state.credentials[index] = action.payload;
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Credentials
      .addCase(deleteCredentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCredentials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.credentials = state.credentials.filter(
          (cred) => cred.id !== action.payload.id
        );
      })
      .addCase(deleteCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default credentialsSlice.reducer;
