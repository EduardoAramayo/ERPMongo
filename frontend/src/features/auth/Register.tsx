// src/features/auth/Register.tsx
import React, { useState, FormEvent } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Paper, Typography, TextField, Button, Stack
} from '@mui/material';

interface RegisterData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Usuario registrado. Ahora inicia sesión.');
      navigate('/');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
        alert((error as { response: { data: { error: string } } }).response.data.error);
      } else {
        alert('Error en el registro');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 5, width: 380, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" color="primary" fontWeight={700} textAlign="center" mb={2}>
          Registro
        </Typography>
        <form onSubmit={handleRegister}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Typography textAlign="center" color="text.secondary">
              ¿Ya tienes cuenta?{' '}
              <Link to="/" style={{ color: '#00796b', textDecoration: 'underline' }}>
                Inicia sesión
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;