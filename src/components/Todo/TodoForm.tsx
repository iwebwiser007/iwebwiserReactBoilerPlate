// src/components/TodoForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from '../UI/Forms/InputField';
import Button from '../UI/Buttons/Button';
import ErrorMessage from '../UI/Notifications/ErrorMessage';

interface TodoFormProps {
    addTodo: (title: string) => void;
}

interface FormInputs {
    todoText: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        addTodo(data.todoText);
        reset(); // Reset the form after submission
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" mb-3">
            <InputField
                label='Todo'
                placeholder="Enter a todo"
                className='me-2'
                register={register('todoText', { required: 'Todo title is required' })}
                name='todoText' />
            <Button type='submit' className='btn-primary mt-2' text='Add' />
            <ErrorMessage message={errors.todoText?.message} className={"ms-2"} />
        </form>
    );
};

export default TodoForm;
