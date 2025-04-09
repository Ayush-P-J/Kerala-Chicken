import { errorMessage } from "@/helper/errorResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({ baseURL: "http://localhost:4000/api/" });

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getFarmer");
      return response.data.data;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Failed to get farmers. Please try again!");
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
  "district/deleteDistrict",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.put(`/deleteFarmer/${id}`);
      toast.success("Supervisor deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return data.data;
    } catch (error) {
      const { message } = error.response.data;
      toast.error(message || "Failed to delete supervisor. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

const initialState = {
  farmers: [],
  loading: false,
  error: null,
};

export const farmerSlice = createSlice({
  name: "farmer",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFarmer.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers.push(action.payload);
      })
      .addCase(addFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFarmers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFarmers.fulfilled, (state, action) => {
        state.loading = false;
        state.farmers = action.payload;
      })
      .addCase(getFarmers.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(editFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editFarmer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedFarmer = action.payload;
        const index = state.farmers.findIndex(
          (f) => f._id === updatedFarmer._id
        );
        if (index !== -1) {
          state.farmers[index] = updatedFarmer;
        }
      })
      .addCase(editFarmer.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteFarmer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFarmer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedFarmer = action.payload;
        const index = state.farmers.findIndex(
          (d) => d._id === deletedFarmer._id
        );
        if (index !== -1) {
          state.farmers[index] = deletedFarmer;
        }
      })
      .addCase(deleteFarmer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default farmerSlice.reducer;
