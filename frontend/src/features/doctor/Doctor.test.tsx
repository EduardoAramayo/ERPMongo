import { render, screen } from '@testing-library/react';
import Doctor from './Doctor';

jest.mock('./hooks/useDoctor', () => () => ({
  doctors: [
    { _id: '1', firstName: 'Juan', lastName: 'Pérez', specialty: 'Cardiología' },
    { _id: '2', firstName: 'Ana', lastName: 'López', specialty: 'Pediatría' },
  ],
  form: { firstName: '', lastName: '', specialty: '' },
  setForm: () => {},
  editingId: null,
  setEditingId: () => {},
  handleSubmit: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
}));

describe('Doctor', () => {
  it('muestra la lista de doctores', () => {
    render(<Doctor />);
    expect(screen.getByText(/juan pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/ana lópez/i)).toBeInTheDocument();
    expect(screen.getByText(/cardiología/i)).toBeInTheDocument();
    expect(screen.getByText(/pediatría/i)).toBeInTheDocument();
  });
});
