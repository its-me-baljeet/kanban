import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    columns: {

    },
    isDark: false,
}

const taskSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addColumn: (state, action) => {
            state.columns[action.payload] = [];
        },
        addTask: (state, action) => {
            const { title, description, column } = action.payload;

            const taskItem = {
                title,
                description
            };

            state.columns[column].push(taskItem);
        }
    }
})

export const { addColumn, addTask } = taskSlice.actions;
export default taskSlice.reducer;
