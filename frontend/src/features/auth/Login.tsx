// src/features/auth/Login.tsx
import React, { useState, FormEvent } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Paper, Typography, TextField, Button, Stack
} from '@mui/material';

interface Credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const [code, setCode] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post<{ userId: string }>('/auth/login', credentials);
      setUserId(data.userId);
      setStep(2);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
        alert((error.response as { data: { message?: string } }).data.message || 'Error en el login');
      } else {
        alert('Error en el login');
      }
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/verify', { userId, code });
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Verificación exitosa');
        navigate('/dashboard');
      } else {
        alert('No se recibió token');
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
      ) {
        alert((error.response as { data: { message?: string } }).data.message || 'Error en la verificación');
      } else {
        alert('Error en la verificación');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 5, width: 380, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" color="primary" fontWeight={700} textAlign="center" mb={2}>
          Iniciar Sesión
        </Typography>
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                required
                fullWidth
              />
              <TextField
                label="Contraseña"
                type="password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Ingresar
              </Button>
              <Typography textAlign="center" color="text.secondary">
                ¿No tienes cuenta?{' '}
                <Link to="/register" style={{ color: '#00796b', textDecoration: 'underline' }}>
                  Regístrate
                </Link>
              </Typography>
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <Stack spacing={2}>
              <TextField
                label="Código de seguridad"
                value={code}
                onChange={e => setCode(e.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Verificar
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default Login;