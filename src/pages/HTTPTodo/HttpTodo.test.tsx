import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import HTTPTodo from '@/pages/HTTPTodo/HTTPTodo';
import { showToastNotification } from '@/utility/helper';
import { callApi } from '@/api/callApi';

// Mock API module
vi.mock('@/api/callApi', () => ({
  callApi: vi.fn(),
}));

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

// Mock Spinner component
vi.mock('@/components/UI/Loading/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('HTTPTodo Component - Core Functionality', () => {
  const user = userEvent.setup();
  const mockTodos = [
    { id: 1, title: 'Test todo 1', completed: false },
    { id: 2, title: 'Test todo 2', completed: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (callApi as Mock).mockReset();
  });

  it('toggles todo completion status', async () => {
    (callApi as Mock)
      .mockResolvedValueOnce(mockTodos) // Initial fetch
      .mockResolvedValueOnce({
        ...mockTodos[0],
        completed: true,
      }); // Toggle response

    render(<HTTPTodo />);

    // Wait for initial load
    await screen.findAllByRole('listitem');

    // Click directly on the todo text
    await user.click(screen.getByText('Test todo 1'));

    // Verify API call
    expect(callApi).toHaveBeenCalledWith(expect.stringContaining('/todos/1'), {
      method: 'PUT',
      data: {
        title: 'Test todo 1',
        completed: true,
      },
    });

    // Verify notification
    expect(showToastNotification).toHaveBeenCalledWith(
      'success',
      'Todo status changed successfully',
    );
  });

  it('deletes a todo successfully', async () => {
    (callApi as Mock)
      .mockResolvedValueOnce(mockTodos) // Initial fetch
      .mockResolvedValueOnce(null); // Delete response

    render(<HTTPTodo />);

    // Wait for initial load
    await screen.findAllByRole('listitem');

    // Query by text content
    const deleteButtons = await screen.findAllByText('Delete');
    await user.click(deleteButtons[0]);

    // Verify deletion from UI
    await waitFor(() => {
      expect(screen.queryByText('Test todo 1')).not.toBeInTheDocument();
    });

    // Verify API call
    expect(callApi).toHaveBeenCalledWith(expect.stringContaining('/todos/1'), {
      method: 'DELETE',
    });

    // Verify notification
    expect(showToastNotification).toHaveBeenCalledWith(
      'success',
      'Todo deleted successfully',
    );
  });
});
