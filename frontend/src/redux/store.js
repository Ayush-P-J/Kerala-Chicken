import { configureStore } from "@reduxjs/toolkit";
import districtReducer from "./slices/districtSlice"
import supervisorReducer from "./slices/supervisorSlice"

export const store = configureStore({
    reducer: {
        district: districtReducer,
        supervisor: supervisorReducer,
    }
})

export default store;