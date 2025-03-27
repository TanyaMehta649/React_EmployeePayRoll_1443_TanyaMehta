
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../Component/Dashboard';

jest.mock('../Component/Header', () => () => <div data-testid="mock-header">Header</div>);


global.fetch = jest.fn();

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


const renderWithRouter = (component) =>
  render(<MemoryRouter>{component}</MemoryRouter>);

describe('Dashboard Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
  });

  test('renders loading state initially', () => {
    fetch.mockImplementationOnce(() => new Promise(() => { }));
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });

  test('renders employee list successfully', async () => {
    const mockEmployees = [
      {
        id: 1,
        name: 'Tanya',
        gender: 'Female',
        departments: ['HR'],
        salary: 30000,
        startDate: '2023-11-04',
        profileImage: 'http://example.com/john.jpg',
      },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEmployees),
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tanya')).toBeInTheDocument();
      expect(screen.getByText('Female')).toBeInTheDocument();
      expect(screen.getByText('HR')).toBeInTheDocument();
      expect(screen.getByText('30000')).toBeInTheDocument();
      expect(screen.getByText('2023-11-04')).toBeInTheDocument();
    });
  });

  test('displays error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  test('filters employees based on search term', async () => {
    const mockEmployees = [
      { id: 1, name: 'Tanya', gender: 'Female', departments: ['HR'], salary: 30000, startDate: '2023-11-04' },
      { id: 2, name: 'Heenu', gender: 'Female', departments: ['IT'], salary: 55000, startDate: '2023-02-01' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockEmployees),
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tanya')).toBeInTheDocument();
      expect(screen.getByText('Heenu')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'Tanya' },
    });

    expect(screen.getByText('Tanya')).toBeInTheDocument();
    expect(screen.queryByText('Heenu')).not.toBeInTheDocument();
  });

  test('handles add user button click', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('No employees found')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add User'));
    expect(mockNavigate).toHaveBeenCalledWith('/registration');
  });

  test('handles edit button click', async () => {
    const mockEmployee = {
      id: 1,
      name: 'Tanya',
      gender: 'Female',
      departments: ['HR'],
      salary: 30000,
      startDate: '2023-11-04',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockEmployee]),
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tanya')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Edit employee')); 

    expect(mockNavigate).toHaveBeenCalledWith('/registration', {
      state: { employee: mockEmployee, isEdit: true },
    });
  });

  test('handles delete button click with confirmation', async () => {
    const mockEmployee = {
      id: 1,
      name: 'Tanya',
      gender: 'Female',
      departments: ['HR'],
      salary: 30000,
      startDate: '2023-11-04',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockEmployee]),
    });
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tanya')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Delete employee')); 

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete the employee?')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/EmpList/1', { method: 'DELETE' });
      expect(screen.queryByText('Sparsh')).not.toBeInTheDocument();
    });
  });

  test('shows error when delete fails', async () => {
    const mockEmployee = {
      id: 1,
      name: 'Tanya',
      gender: 'Female',
      departments: ['HR'],
      salary: 30000,
      startDate: '2023-11-04',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockEmployee]),
    });
    fetch.mockRejectedValueOnce(new Error('Delete failed'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

    renderWithRouter(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Tanya')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Delete employee')); 

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete the employee?')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Confirm'));

    consoleErrorSpy.mockRestore();
  });
  test('renders header component', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    renderWithRouter(<Dashboard />);

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});