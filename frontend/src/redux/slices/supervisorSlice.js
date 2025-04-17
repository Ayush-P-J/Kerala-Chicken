import { errorMessage } from "@/helper/errorResponse";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "@/lib/axiosInstance";

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
      const { message } = error.response.data;
      toast.error(message || "Failed to add supervisor. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const getSupervisors = createAsyncThunk(
  "supervisor/getSupervisors",
  async ({ search = "", page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get("/getSupervisor", {
        params: { search, page, limit },
      });
      return {
        data: response.data.data,
        total: response.data.total,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get supervisors. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

//for the create farmer
export const getSupervisorsName = createAsyncThunk(
  "supervisor/getSupervisorsName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/getSupervisorsName", {
      });
      return {
        data: response.data.data,

      };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get supervisors. Please try again!";
      toast.error(message);
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const editSupervisor = createAsyncThunk(
  "supervisor/editSupervisor",
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
      const { message } = error.response.data;
      toast.error(message || "Failed to update supervisor. Please try again!");
      return rejectWithValue(errorMessage(error));
    }
  }
);

export const deleteSupervisor = createAsyncThunk(
  "supervisor/deleteSupervisor",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.put(`/deleteSupervisor/${id}`);
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
  supervisors: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  total: 0,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  limit: 5,
};

export const supervisorSlice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addSupervisor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addSupervisor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supervisors.push(action.payload);
      })
      .addCase(addSupervisor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add supervisor";
      })

      .addCase(getSupervisors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSupervisors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supervisors = action.payload.data;
        state.total = action.payload.total;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getSupervisors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(getSupervisorsName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSupervisorsName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supervisors = action.payload.data;
      })
      .addCase(getSupervisorsName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong!";
      })

      .addCase(editSupervisor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editSupervisor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSupervisor = action.payload;
        const index = state.supervisors.findIndex(
          (s) => s._id === updatedSupervisor._id
        );
        if (index !== -1) {
          state.supervisors[index] = updatedSupervisor;
        }
      })
      .addCase(editSupervisor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to update supervisor";
      })

      .addCase(deleteSupervisor.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSupervisor.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedSupervisor = action.payload;
        const index = state.supervisors.findIndex(
          (d) => d._id === deletedSupervisor._id
        );
        if (index !== -1) {
          state.supervisors[index] = deletedSupervisor;
        }
      })
      .addCase(deleteSupervisor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to delete supervisor";
      });
  },
});

export default supervisorSlice.reducer;