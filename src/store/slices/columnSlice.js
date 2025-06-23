import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    columns: [
        { id: nanoid(), name: "Todo", color: "#3b82f6" },
        { id: nanoid(), name: "In Progress", color: "#facc15" },
        { id: nanoid(), name: "Done", color: "#22c55e" }
    ],
    isDark: false
};

const columnSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addColumn: (state, action) => {
            const { name, color } = action.payload;
            const exists = state.columns.some(col => col.name === name);
            if (!exists) {
                state.columns.push({ id: nanoid(), name, color: color || "#d1d5db" });
            }
        },
        editColumn: (state, action) => {
            const { id, newName, newColor } = action.payload;
            const column = state.columns.find(col => col.id === id);
            const nameExists = state.columns.some(col => col.name === newName && col.id !== id);
            if (column && (column.name === newName || !nameExists)) {
                column.name = newName;
                column.color = newColor;
            }
        },
        deleteColumn: (state, action) => {
            const { id } = action.payload;
            state.columns = state.columns.filter(col => col.id !== id);
        },
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
        }
    }
});

export const { addColumn, editColumn, deleteColumn, toggleTheme } = columnSlice.actions;
export default columnSlice.reducer;
