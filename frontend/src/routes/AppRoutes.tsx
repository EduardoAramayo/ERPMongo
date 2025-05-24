// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Box, CssBaseline, CircularProgress } from '@mui/material';
import Sidebar from '../components/Sidebar';

// Lazy load de páginas para mejorar el performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../features/auth/Login'));
const Register = lazy(() => import('../features/auth/Register'));
const Patients = lazy(() => import('../features/patients/Patients'));
const Medications = lazy(() => import('../features/medications/Medications'));
const Prescriptions = lazy(() => import('../features/prescriptions/Prescriptions'));
const Appointments = lazy(() => import('../features/appointments/Appointments'));
const Doctor = lazy(() => import('../features/doctor/Doctor'));
const ReporteHistorialPaciente = lazy(() => import('../features/reports/ReporteHistorialPaciente'));
const ReporteInventarioMedicamentos = lazy(() => import('../features/reports/ReporteInventarioMedicamentos'));

// Layout con Sidebar para páginas internas
const MainLayout: React.FC = () => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
    <CssBaseline />
    <Sidebar />
    <Box sx={{ flex: 1 }}>
      <Suspense fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      }>
        <Outlet />
      </Suspense>
    </Box>
  </Box>
);

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
            <Register />
          </Suspense>
        }
      />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/reporte-historial-paciente" element={<ReporteHistorialPaciente />} />
        <Route path="/reporte-inventario-medicamentos" element={<ReporteInventarioMedicamentos />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;