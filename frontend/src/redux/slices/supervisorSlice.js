import { errorMessage } from "@/helper/errorResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({ baseURL: "http://localhost:4000/api/" });

export const addSupervisor = createAsyncThunk(
  "supervisor/addSupervisor",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post("/addSupervisor", formData);
      toast.success("Supervisor added successfully!", {
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

      toast.error( message || "Failed to add supervisor. Please try again!");
      console.log(error);
      
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getSupervisors = createAsyncThunk(
  "district/getSupervisor",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getSupervisor");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to get supervisor. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const editSupervisor = createAsyncThunk(
  "district/editSupervisor",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await api.post("/editSupervisor", formData);
      toast.success("Supervisor updated successfully!", {
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
  supervisors: [],
  loading: false,
  error: null,
};

export const supervisorSlice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addSupervisor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupervisor.fulfilled, (state, action) => {
        state.loading = false;
        state.supervisors.push(action.payload);
      })
      .addCase(addSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSupervisors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupervisors.fulfilled, (state, action) => {
        state.loading = false;
        state.supervisors = action.payload;
      })
      .addCase(getSupervisors.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(editSupervisor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSupervisor.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSupervisor = action.payload;
        const index = state.supervisors.findIndex(
          (s) => s._id === updatedSupervisor._id
        );
        if (index !== -1) {
          state.supervisors[index] = updatedSupervisor; 
        }
      })
      .addCase(editSupervisor.rejected, (state, action) =>{
        state.error = action.error.payload
      })
  },
});

export default supervisorSlice.reducer;
