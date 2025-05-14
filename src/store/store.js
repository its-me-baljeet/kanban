import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/taskSlice"

const store = configureStore({
    reducer: {
        app: appReducer,
    }
})
export default store;