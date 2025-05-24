import { render, screen } from '@testing-library/react';
import Medications from './Medications';

jest.mock('./hooks/useMedications', () => () => ({
  medications: [
    { _id: '1', name: 'Paracetamol', quantity: 10 },
    { _id: '2', name: 'Ibuprofeno', quantity: 5 },
  ],
  form: { name: '', description: '', quantity: 0 },
  setForm: () => {},
  editingId: null,
  setEditingId: () => {},
  handleSubmit: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
}));

describe('Medications', () => {
  it('renderiza los nombres de los medicamentos', () => {
    render(<Medications />);
    expect(screen.getByText(/paracetamol/i)).toBeInTheDocument();
    expect(screen.getByText(/ibuprofeno/i)).toBeInTheDocument();
  });
});
