import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./slices/districtSlice"
import supervisorReducer from "./slices/supervisorSlice"
import farmerReducer from "./slices/farmerSlice"

export const store = configureStore({
    reducer: {
        district: districtReducer,
        supervisor: supervisorReducer,
        farmer: farmerReducer,
    }
})

export default store;