import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import TodoForm from '../../components/Todo/TodoForm';
import type { Todo } from '../../interfaces/Todo.model';
import TodoList from '../../components/Todo/TodoList';
import { showToastNotificatoin } from '../../utility/helper';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * 
   * @param title Add title to todo list with id and complete params
   */
  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    showToastNotificatoin('success', 'Todo added successfully')
  };

  /**
   * 
   * @param id toggle todo complete status find by id
   */
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    showToastNotificatoin('success', 'Todo status changed successfully')
  };

  /**
   * 
   * @param id delete todo find by id
   */
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    showToastNotificatoin('success', 'Todo deleted successfully')
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </Layout>
  );
};

export default Todo;
