import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice"
import columnReducer from "./slices/columnSlice"
import { saveState } from "../services/localStorageHelpers";

const store = configureStore({
    reducer: {
        taskSlice: taskReducer,
        columnSlice: columnReducer
    }
})

store.subscribe(() => {
    const state = store.getState();
    saveState("columnState", state.columnSlice);
    saveState("taskState", state.taskSlice);
})

export default store;