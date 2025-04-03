import { errorMessage } from "@/helper/errorResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({ baseURL: "http://localhost:4000/api/" });

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

      toast.error("Failed to get districts. Please try again!");
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

const initialState = {
  districts: [],
  loading: false,
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
  },
});

export default districtSlice.reducer;
