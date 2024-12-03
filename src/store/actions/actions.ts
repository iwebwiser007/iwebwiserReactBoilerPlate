import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from "../types";


export const addTodo = (title: string) => ({
    type: ADD_TODO,
    payload: title,
});

export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    payload: id,
});

export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id,
});
