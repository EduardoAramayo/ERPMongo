import { render, screen } from '@testing-library/react';
import Register from './Register';

describe('Register', () => {
  it('renderiza los campos requeridos para el registro', () => {
    render(<Register />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();
  });
});
