import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { showToastNotification } from '@/utility/helper';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '@/store/reducers/todoReducer';
import ReduxTodo from '@/pages/ReduxTodo/ReduxTodo';
import { ITodo } from '@/interfaces/Todo.model';

// Mock toast notifications
vi.mock('@/utility/helper', () => ({
  showToastNotification: vi.fn(),
}));

// Mock Layout to avoid router dependencies
vi.mock('@/components/Layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('ReduxTodo Component - Core Functionality', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Create a real Redux store for testing
  const createTestStore = (
    preloadedState: {
      root: {
        todos: ITodo[];
      };
    } = { root: { todos: [] } },
  ) => {
    return configureStore({
      reducer: {
        root: todoReducer,
      },
      preloadedState,
    });
  };

  it('initializes with empty todo list', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('adds new todos through form submission', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    // Add first todo
    const input = screen.getByPlaceholderText('Enter a todo');
    await user.type(input, 'Buy groceries');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Verify todo in store state
    const state = store.getState().root;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].title).toBe('Buy groceries');
  });

  it('prevents adding empty todos', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    await user.click(screen.getByRole('button', { name: /add/i }));

    expect(await screen.findByText('Todo title is required')).toBeVisible();
    expect(store.getState().root.todos).toHaveLength(0);
  });

  it('toggles todo completion status', async () => {
    const initialState = {
      root: {
        todos: [{ id: 1, title: 'Test todo', completed: false }],
      },
    };
    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    // Get todo text element
    const todoText = screen.getByText('Test todo');

    // Toggle completion
    await user.click(todoText);

    // Verify state update
    expect(store.getState().root.todos[0].completed).toBe(true);
  });

  it('deletes todos', async () => {
    const initialState = {
      root: {
        todos: [{ id: 1, title: 'Delete me', completed: false }],
      },
    };
    const store = createTestStore(initialState);
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    // Verify todo exists
    expect(screen.getByText('Delete me')).toBeInTheDocument();

    // Delete todo
    await user.click(screen.getByText('Delete'));

    // Verify deletion
    await waitFor(() => {
      expect(store.getState().root.todos).toHaveLength(0);
    });
  });

  it('triggers notifications for all actions', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <ReduxTodo />
      </Provider>,
    );

    // Add todo
    await user.type(screen.getByPlaceholderText('Enter a todo'), 'Test todo');
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Toggle todo
    await user.click(screen.getByText('Test todo'));

    // Delete todo
    await user.click(screen.getByText('Delete'));

    // Verify notifications
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
