// src/features/medications/Medications.tsx
import React from 'react';
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, IconButton, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../components/Sidebar';
import useMedications from './hooks/useMedications';

const Medications: React.FC = () => {
  const {
    medications, form, setForm, editingId, setEditingId, handleSubmit, handleEdit, handleDelete
  } = useMedications();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Gestión de Medicamentos
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 500 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Nombre"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <TextField
                label="Descripción"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <TextField
                label="Cantidad"
                type="number"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: parseInt(e.target.value) || 0 })}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Lista de Medicamentos</Typography>
          <List>
            {medications.map((medication) => (
              <ListItem
                key={medication._id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(medication)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(medication._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={`${medication.name} (${medication.quantity} unidades)`}
                  secondary={medication.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Medications;