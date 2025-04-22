import { errorMessage } from "@/helper/errorResponse";
import createAxiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import api from "@/lib/axiosInstance";

export const addDistrict = createAsyncThunk(
  "district/addDistrict",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post("/addDistrict", formData);
      toast.success("District added successfully!", {
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
      const message =
        error?.response?.data?.message ||
        "Failed to add district. Please try again!";
      toast.error(message);
      console.log(message);

      return rejectWithValue(errorMessage(error));
    }
  }
);

//To get the list of district in the create supervisor

export const getDistrictsName = createAsyncThunk(
  "district/getDistrictsName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getDistrictsName");
      console.log("name");
      return response.data.data;
    } catch (error) {
      const { message } = error?.response?.data;

      toast.error(message || "Failed to get districts. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getDistricts = createAsyncThunk(
  "district/getDistrict",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/getDistrict", {
        params: { search, page, limit },
      });
      console.log(response)

      return {
        data: response.data.data,
        total: response.data.pagination.total,
        currentPage: response.data.pagination.currentPage,
        totalPages: response.data.pagination.totalPages,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to get districts. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const editDistrict = createAsyncThunk(
  "district/editDistrict",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post("/editDistrict", formData);
      toast.success("District updated successfully!", {
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
      const { message } = error?.response?.data;

      toast.error(message || "Failed to update district. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  "district/deleteDistrict",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.put(`/deleteDistrict/${id}`);
      toast.success("District deleted successfully!", {
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
      console.log(error);

      const { message } = error?.response?.data;
      toast.error(message || "Failed to delete district. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

const initialState = {
  districts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  limit: 5,
};

export const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addDistrict.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addDistrict.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.districts.push(action.payload);
      })
      .addCase(addDistrict.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add district";
      })

      .addCase(getDistricts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.districts = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })

      //To get the list of district in the create supervisor

      .addCase(getDistrictsName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDistrictsName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.districts = action.payload.data;
      })
      .addCase(getDistrictsName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })

      .addCase(editDistrict.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editDistrict.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedDistrict = action.payload;
        const index = state.districts.findIndex(
          (d) => d._id === updatedDistrict._id
        );
        if (index !== -1) {
          state.districts[index] = updatedDistrict;
        }
      })
      .addCase(editDistrict.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.payload;
      })

      .addCase(deleteDistrict.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedDistrict = action.payload;
        const index = state.districts.findIndex(
          (d) => d._id === deletedDistrict._id
        );
        if (index !== -1) {
          state.districts[index] = deletedDistrict;
        }
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete district";
      });
  },
});

export default districtSlice.reducer;
