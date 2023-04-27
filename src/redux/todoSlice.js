import { createSlice, } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: Math.random(),
                name: action.payload.todo,
            };
            state.push(newTask);
        },
        deleteTask: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addTask, deleteTask } = todoSlice.actions;

export default todoSlice.reducer;