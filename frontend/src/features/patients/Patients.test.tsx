import { render, screen } from '@testing-library/react';
import Patients from './Patients';

jest.mock('./hooks/usePatients', () => () => ({
  patients: [
    { _id: '1', firstName: 'Carlos', lastName: 'Ramírez', email: 'carlos@mail.com' },
    { _id: '2', firstName: 'Lucía', lastName: 'Gómez', email: 'lucia@mail.com' },
  ],
  form: { firstName: '', lastName: '', email: '' },
  setForm: () => {},
  editingId: null,
  setEditingId: () => {},
  handleSubmit: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
}));

describe('Patients', () => {
  it('muestra la lista de pacientes', () => {
    render(<Patients />);
    expect(screen.getByText(/carlos ramírez/i)).toBeInTheDocument();
    expect(screen.getByText(/lucía gómez/i)).toBeInTheDocument();
    expect(screen.getByText(/carlos@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/lucia@mail.com/i)).toBeInTheDocument();
  });
});
