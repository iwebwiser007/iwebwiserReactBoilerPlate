import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '@/pages/Todo/Todo';
import { describe, expect } from 'vitest';
import React from 'react';
import { showToastNotification } from '@/utility/helper';

// Moke layout to avoid rendering issues in tests
vi.mock('@components/Layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Moke Test Notification
vi.mock('@/utility/helper', () => ({
  showToastNotification: vi.fn(),
}));

describe('Todo Component - core functionality', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initilizes with empty todo list', () => {
    render(<Todo />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('add new todo through TodoForm', async () => {
    render(<Todo />);

    //Add a new todo item
    const input = screen.getByPlaceholderText('Enter a todo');
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    //Add second todo item
    await user.type(input, 'Walk the dog');
    await user.click(screen.getByRole('button', { name: /add/i }));

    //verify that the todo items are added to the list
    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(2);
    expect(todos[0]).toHaveTextContent('Buy groceries');
    expect(todos[1]).toHaveTextContent('Walk the dog');
  });

  it('preventing adding empty todo', async () => {
    render(<Todo />);

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Todo title is required')).toBeInTheDocument();
  });

  it('toggle todo complete status', async () => {
    render(<Todo />);

    // Add a new todo item
    await user.type(
      screen.getByPlaceholderText('Enter a todo'),
      'Buy groceries',
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    //Get Todo text element
    const todoText = screen.getByText('Buy groceries');

    // Verify Intial list state
    expect(todoText).not.toHaveStyle('text-decoration: line-through');

    // Toggle the todo item
    await user.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  it('delete todo item', async () => {
    render(<Todo />);

    // Add a new todo item
    await user.type(
      screen.getByPlaceholderText('Enter a todo'),
      'Buy groceries',
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Verify the todo item is in the list
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();

    await user.click(screen.getByText('Delete'));

    await waitFor(() => {
      // Verify the todo item is removed from the list
      expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
    });
  });

  it('trigger notification for all actions', async () => {
    render(<Todo />);

    //add a new todo item
    await user.type(
      screen.getByPlaceholderText('Enter a todo'),
      'Buy groceries',
    );
    await user.click(screen.getByRole('button', { name: /add/i }));

    //Toggle the todo item
    await user.click(screen.getByText('Buy groceries'));

    //Delete the todo item
    await user.click(screen.getByText('Delete'));

    // Verify that notifications are triggered
    expect(showToastNotification).toHaveBeenCalledTimes(3);
    expect(showToastNotification).toHaveBeenCalledWith(
      'success',
      'Todo added successfully',
    );
    expect(showToastNotification).toHaveBeenCalledWith(
      'success',
      'Todo status changed successfully',
    );
    expect(showToastNotification).toHaveBeenCalledWith(
      'success',
      'Todo deleted successfully',
    );
  });
});
