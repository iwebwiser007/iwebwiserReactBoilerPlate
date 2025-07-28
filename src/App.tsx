import HTTPTodo from '@/pages/HTTPTodo/HTTPTodo';
import ReduxTodo from '@/pages/ReduxTodo/ReduxTodo';
import Todo from '@/pages/Todo/Todo';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/redux" element={<ReduxTodo />} />
      <Route path="/http" element={<HTTPTodo />} />
    </Routes>
  );
};

export default App;
