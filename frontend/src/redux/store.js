import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./slices/districtSlice"
import supervisorReducer from "./slices/supervisorSlice"
import farmerReducer from "./slices/farmerSlice"
import credentialsReducer from "./slices/credentialsSlice"

export const store = configureStore({
    reducer: {
        district: districtReducer,
        supervisor: supervisorReducer,
        farmer: farmerReducer,
        credentials: credentialsReducer,
    }
})

export default store;