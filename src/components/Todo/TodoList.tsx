import React from 'react';
import { Todo } from '../../interfaces/Todo';
import List from '../UI/List/List';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
    return (
        <>
            <List
                items={todos}
                renderItem={(todo: Todo, index: number) => (
                    <div className='d-flex justify-content-between' >
                        <span
                            key={index}
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                                cursor: "pointer",
                            }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            {todo.title}
                        </span>
                        <span style={{
                            cursor: "pointer",
                        }}
                            onClick={() => deleteTodo(todo.id)}> Delete </span>
                    </div>
                )}
            />
        </>
    );
};

export default TodoList;
