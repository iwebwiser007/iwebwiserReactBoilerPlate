import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import TodoForm from '../../components/Todo/TodoForm';
import type { Todo } from '../../interfaces/Todo';
import TodoList from '../../components/Todo/TodoList';
import { callApi } from '../../api/callApi';
import { API_ENDPOINT, API_URL } from '../../api/constant';
import { showToastNotificatoin } from '../../utility/helper';
import Spinner from '../../components/UI/Loading/Spinner';

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch todos from the API on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    /**
     * Fetch the list of todos from the API and update state.
     */
    const fetchTodos = async () => {
        setLoading(true);
        setError(null);
        try {
            const todoList = await callApi<Todo[]>(API_URL + API_ENDPOINT.todo, {
                method: 'GET',
            });
            setTodos(todoList.slice(0, 10)); // Limiting to 10 todos for simplicity
        } catch (err: any) {
            setError('Failed to fetch todos. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Create a new todo by calling the API and re-fetch the list.
     * @param {string} title - The title of the new todo.
     */
    const addTodo = async (title: string) => {
        const newTodo: Partial<Todo> = {
            title: title,
            completed: false,
        };
        try {
            const result = await callApi<Todo>(API_URL + API_ENDPOINT.todo, {
                method: 'POST',
                data: newTodo,
            });
            showToastNotificatoin('success', 'Todo added successfully')
            setTodos([...todos, result])
        } catch (err: any) {
            setError('Failed to add todo. Please try again later.');
            console.error(err);
        }
    };

    /**
     * Toggle the completion status of a todo by calling the API and updating state.
     * @param {number} id - The ID of the todo to toggle.
     */
    const toggleTodo = async (id: number) => {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return;

        const updatedTodo = { title: todo.title, completed: !todo.completed };
        try {
            const result = await callApi<Todo>(API_URL + API_ENDPOINT.todo + `${id}`, {
                method: 'PUT',
                data: updatedTodo,
            });
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? result : todo))
            );
            showToastNotificatoin('success', 'Todo status changed successfully')
        } catch (err: any) {
            setError('Failed to toggle todo status. Please try again later.');
            console.error(err);
        }
    };

    /**
     * Delete a todo by calling the API and updating state.
     * @param {number} id - The ID of the todo to delete.
     */
    const deleteTodo = async (id: number) => {
        try {
            await callApi<void>(API_URL + API_ENDPOINT.todo + `${id}`, {
                method: 'DELETE',
            });
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            showToastNotificatoin('success', 'Todo deleted successfully')
        } catch (err: any) {
            setError('Failed to delete todo. Please try again later.');
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h1 className="text-center">To-Do List</h1>

                {/* Display loading spinner or error message */}
                {loading && <div className="text-center"><Spinner /></div>}
                {error && <div className="text-danger text-center">{error}</div>}

                {/* Todo form to add new todos */}
                <TodoForm addTodo={addTodo} />

                {/* Todo list */}
                <TodoList
                    todos={todos}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </Layout>
    );
};

export default Todo;
