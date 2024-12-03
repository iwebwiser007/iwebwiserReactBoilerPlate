import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo/Todo";
import ReduxTodo from "./pages/ReduxTodo/ReduxTodo";
import HTTPTodo from "./pages/HTTPTodo/HTTPTodo";

const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/redux" element={<ReduxTodo />} />
      <Route path="/http" element={<HTTPTodo />} />
    </Routes>
  )
}

export default App
