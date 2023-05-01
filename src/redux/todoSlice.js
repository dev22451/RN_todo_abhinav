import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todo: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todo.push({
                id: Math.random(),
                title: action.payload.title,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

        },

        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(todo => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const index = state.todo.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todo[index].title = action.payload.title;
            }
        },
    },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;


export default todoSlice.reducer;
