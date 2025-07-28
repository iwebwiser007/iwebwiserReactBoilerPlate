import Layout from '@/components/Layout/Layout';
import TodoForm from '@/components/Todo/TodoForm';
import TodoList from '@/components/Todo/TodoList';
import { RootState } from '@/store';
import { addTodo, deleteTodo, toggleTodo } from '@/store/actions/actions';
import { showToastNotification } from '@/utility/helper';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
const ReduxTodo: React.FC = () => {
  const todos = useSelector((state: RootState) => state.root.todos);
  const dispatch = useDispatch();

  /**
   *
   * @param title add title to redux todo list with addTodo Action
   */
  const handleAddTodo = (title: string) => {
    dispatch(addTodo(title));
    showToastNotification('success', 'Todo added successfully');
  };

  /**
   *
   * @param id toggle selected todo complete status find by id
   */
  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
    showToastNotification('success', 'Todo status changed successfully');
  };

  /**
   *
   * @param id delete selected todo complete status find by id
   */
  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
    showToastNotification('success', 'Todo deleted successfully');
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center">To-Do List With Redux</h1>
        <TodoForm addTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          toggleTodo={handleToggleTodo}
          deleteTodo={handleDeleteTodo}
        />
      </div>
    </Layout>
  );
};

export default ReduxTodo;
