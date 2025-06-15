// src/pages/Dashboard.tsx
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Stack } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import Sidebar from '../components/Sidebar';

const summaryData = [
  {
    title: 'Pacientes',
    value: 45,
    icon: <PeopleAltIcon fontSize="large" color="primary" />,
    color: '#e0f7fa',
  },
  {
    title: 'Citas Pendientes',
    value: 12,
    icon: <EventNoteIcon fontSize="large" color="secondary" />,
    color: '#e3f2fd',
  },
  {
    title: 'Inventario de Medicamentos',
    value: 78,
    icon: <LocalPharmacyIcon fontSize="large" sx={{ color: '#43a047' }} />,
    color: '#e8f5e9',
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: { xs: 2, md: 6 } }}>
        <Typography variant="h3" color="primary" fontWeight={700} mb={2}>
          Bienvenido al Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Aquí podrás gestionar la información de la clínica y ver un resumen de tus datos.
        </Typography>

        {/* Reemplazamos Grid por Box con flex */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          {summaryData.map((item) => (
            <Box
              key={item.title}
              sx={{
                flex: 1,
                minWidth: 0,
                mb: { xs: 4, md: 0 },
              }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: item.color }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'white', width: 56, height: 56 }}>
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight={600}>
                        {item.value}
                      </Typography>
                      <Typography color="text.secondary">{item.title}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;