// src/layouts/DashboardLayout.tsx
import React from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC<{ children?: React.ReactNode }> = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Panel de Control
        </Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;