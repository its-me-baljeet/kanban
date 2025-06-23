import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"
import columnReducer from "./slices/columnSlice"

const store = configureStore({
    reducer: {
        taskSlice: taskReducer,
        columnSlice: columnReducer
    }
})
export default store;