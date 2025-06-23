import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { title, description, column } = action.payload;
            const newTask = {
                id: nanoid(),
                title,
                description,
                column,
            };
            state.tasks.push(newTask);
        },
        editTask: (state, action) => {
            const { id, title, description, toCol } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.title = title;
                task.description = description;
                task.column = toCol;
            }
        },
        deleteTask: (state, action) => {
            const { id } = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
        moveTask: (state, action) => {
            const { sourceIdx, destIdx, sourceCol, destCol } = action.payload;
            const tasksInColumn = state.tasks.filter(task => task.column === sourceCol);
            const movingTask = tasksInColumn[sourceIdx];
            if (!movingTask) return;

            const taskIndexInGlobal = state.tasks.findIndex(task => task.id === movingTask.id);
            state.tasks.splice(taskIndexInGlobal, 1);

            movingTask.column = destCol;

            const destTasks = state.tasks.filter(task => task.column === destCol);
            const destTask = destTasks[destIdx];
            const globalDestIndex = destTask
                ? state.tasks.findIndex(task => task.id === destTask.id)
                : state.tasks.length;

            state.tasks.splice(globalDestIndex, 0, movingTask);
        }

    },
});

export const { addTask, editTask, deleteTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
