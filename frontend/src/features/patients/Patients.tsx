// src/pages/Patients.tsx
import React from 'react';
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, IconButton, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../components/Sidebar';
import usePatients from './hooks/usePatients';

const Patients: React.FC = () => {
  const {
    patients, form, setForm, editingId, handleSubmit, handleEdit, handleDelete
  } = usePatients();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Gestión de Pacientes
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 500 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <TextField
                label="Apellido"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Lista de Pacientes</Typography>
          <List>
            {patients.map((patient) => (
              <ListItem
                key={patient._id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(patient)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(patient._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={`${patient.firstName} ${patient.lastName}`}
                  secondary={patient.email}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Patients;