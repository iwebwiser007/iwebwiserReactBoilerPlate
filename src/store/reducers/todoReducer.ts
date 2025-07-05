import { Todo } from '../../interfaces/Todo.model';
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../types';



// Define the initial state
interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: [],
};

// Reducer function
const todoReducer = (state = initialState, action: any): TodosState => {
    switch (action.type) {
        case ADD_TODO:
            const newTodo: Todo = {
                id: state.todos.length + 1,
                title: action.payload,
                completed: false,
            };
            return {
                ...state,
                todos: [...state.todos, newTodo],
            };

        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                ),
            };

        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };

        default:
            return state;
    }
};

export default todoReducer;
