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
      const {message} = error.response.data
      toast.error(message || "Failed to add district. Please try again!")
      console.log(message);
      
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getDistricts = createAsyncThunk(
  "district/getDistrict",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getDistrict");
      return response.data.data;
    } catch (error) {
      const {message} = error.response.data

      toast.error(message || "Failed to get districts. Please try again!");
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
      const {message} = error.response.data

      toast.error(message || "Failed to update district. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const deleteDistrict = createAsyncThunk(
  "district/deleteDistrict",
  async (id,{rejectWithValue}) => {
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
      console.log(error)

      const {message} = error.response.data
      toast.error(message || "Failed to delete district. Please try again!");
      return rejectWithValue(errorMessage(error));

    }
  }
)

const initialState = {
  districts: [],
  loading: false, //idle,loading,success,error
  error: null,
};

export const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.districts.push(action.payload);
      })
      .addCase(addDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getDistricts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(editDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDistrict.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDistrict = action.payload;
        const index = state.districts.findIndex(
          (d) => d._id === updatedDistrict._id
        );
        if (index !== -1) {
          state.districts[index] = updatedDistrict; 
        }
      })
      .addCase(editDistrict.rejected, (state, action) =>{
        state.error = action.error.payload
      }) 

      .addCase(deleteDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDistrict.fulfilled, (state, action) => {
        state.loading = false;
        const deletedDistrict = action.payload;
        const index = state.districts.findIndex(d => d._id === deletedDistrict._id);
        if (index !== -1) {
          state.districts[index] = deletedDistrict; 
        }
      })
      .addCase(deleteDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export default districtSlice.reducer;
