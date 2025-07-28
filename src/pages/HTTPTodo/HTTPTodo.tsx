import React, { useEffect, useState } from 'react';
import { callApi, IApiErrorResponse } from '@/api/callApi';
import { API_ENDPOINT, API_URL } from '@/api/constant';
import Layout from '@/components/Layout/Layout';
import TodoForm from '@/components/Todo/TodoForm';
import TodoList from '@/components/Todo/TodoList';
import Spinner from '@/components/UI/Loading/Spinner';
import { ITodo } from '@/interfaces/Todo.model';
import { showToastNotification } from '@/utility/helper';

const HTTPTodo: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
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
      const todoList = await callApi<ITodo[]>(API_URL + API_ENDPOINT.todo, {
        method: 'GET',
      });
      setTodos(todoList.slice(0, 10)); // Limiting to 10 todos for simplicity
    } catch (err: unknown) {
      const error = err as IApiErrorResponse;
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new todo by calling the API and re-fetch the list.
   * @param {string} title - The title of the new todo.
   */
  const addTodo = async (title: string) => {
    const newTodo: Partial<ITodo> = {
      title: title,
      completed: false,
    };
    try {
      const result = await callApi<ITodo>(API_URL + API_ENDPOINT.todo, {
        method: 'POST',
        data: newTodo,
      });
      showToastNotification('success', 'Todo added successfully');
      setTodos([...todos, result]);
    } catch (err: unknown) {
      const error = err as IApiErrorResponse;
      setError(error.message ?? 'Failed to add todo. Please try again later.');
    }
  };

  /**
   * Toggle the completion status of a todo by calling the API and updating state.
   * @param {number} id - The ID of the todo to toggle.
   */
  const toggleTodo = async (id: number) => {
    const todo = todos.find((todo: ITodo) => todo.id === id);
    if (!todo) return;

    const updatedTodo = { title: todo.title, completed: !todo.completed };
    try {
      const result = await callApi<ITodo>(
        API_URL + API_ENDPOINT.todo + `${id}`,
        {
          method: 'PUT',
          data: updatedTodo,
        },
      );
      setTodos((prevTodos: ITodo[]) =>
        prevTodos.map((todo) => (todo.id === id ? result : todo)),
      );
      showToastNotification('success', 'Todo status changed successfully');
    } catch (err: unknown) {
      const error = err as IApiErrorResponse;
      setError(
        error.message ??
          'Failed to toggle todo status. Please try again later.',
      );
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
      setTodos((prevTodos: ITodo[]) =>
        prevTodos.filter((todo) => todo.id !== id),
      );
      showToastNotification('success', 'Todo deleted successfully');
    } catch (err: unknown) {
      const error = err as IApiErrorResponse;
      setError(
        error.message ?? 'Failed to delete todo. Please try again later.',
      );
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center">To-Do List</h1>

        {/* Display loading spinner or error message */}
        {loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
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

export default HTTPTodo;
