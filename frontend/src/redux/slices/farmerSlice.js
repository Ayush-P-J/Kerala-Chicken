import { errorMessage } from "@/helper/errorResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "@/lib/axiosInstance";

export const addFarmer = createAsyncThunk(
  "farmer/addFarmer",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/addFarmer", formData);
      toast.success("Farmer added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return data;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Failed to add farmer. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getFarmers = createAsyncThunk(
  "farmer/getFarmers",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/getFarmer", {
        params: { search, page, limit },
      });
      return {
        data: response.data.data,
        total: response.data.total,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get farmers. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const editFarmer = createAsyncThunk(
  "farmer/editFarmer",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/editFarmer", formData);
      toast.success("Farmer updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return data;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Failed to update farmer. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const deleteFarmer = createAsyncThunk(
  "farmer/deleteFarmer",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/deleteFarmer/${id}`);
      toast.success("Farmer deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return data;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Failed to delete farmer. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

const initialState = {
  farmers: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  limit: 5,
};

export const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFarmer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addFarmer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.farmers.push(action.payload);
      })
      .addCase(addFarmer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add farmer";
      })

      .addCase(getFarmers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFarmers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.farmers = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getFarmers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })

      .addCase(editFarmer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editFarmer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedFarmer = action.payload;
        const index = state.farmers.findIndex(
          (f) => f._id === updatedFarmer._id
        );
        if (index !== -1) {
          state.farmers[index] = updatedFarmer;
        }
      })
      .addCase(editFarmer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update farmer";
      })

      .addCase(deleteFarmer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteFarmer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedFarmer = action.payload;
        const index = state.farmers.findIndex(
          (d) => d._id === deletedFarmer._id
        );
        if (index !== -1) {
          state.farmers[index] = deletedFarmer;
        }
      })
      .addCase(deleteFarmer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete farmer";
      });
  },
});

export default farmerSlice.reducer;