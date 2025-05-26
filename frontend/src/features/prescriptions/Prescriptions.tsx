// src/features/prescriptions/Prescriptions.tsx
import React from 'react';
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, IconButton, Stack, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../components/Sidebar';
import usePrescriptions from './hooks/usePrescriptions';

// Define the Prescription type (adjust fields as needed)
type Prescription = {
  _id: string;
  patient: { _id: string; firstName: string; lastName: string } | string;
  doctor: { _id: string; firstName: string; lastName: string; specialty: string } | string;
  medications: { medicationId: string | { _id: string; name: string; quantity: number }; quantity: number }[];
  date: string | Date;
};

const Prescriptions: React.FC = () => {
  const {
    prescriptions, patients, medications, doctors, form, setForm, editingId, setEditingId, createOrUpdate, deletePrescription
  } = usePrescriptions();

  // Type guard to check if patient is an object with _id
  function isPatientObject(patient: Prescription['patient']): patient is { _id: string; firstName: string; lastName: string } {
    return typeof patient === 'object' && patient !== null && '_id' in patient;
  }

  // Type guard to check if doctor is an object with _id
  function isDoctorObject(doctor: Prescription['doctor']): doctor is { _id: string; firstName: string; lastName: string; specialty: string } {
    return typeof doctor === 'object' && doctor !== null && '_id' in doctor;
  }

  const handleEdit = (prescription: Prescription) => {
    setForm({
      patient: isPatientObject(prescription.patient) ? prescription.patient._id : prescription.patient,
      doctor: isDoctorObject(prescription.doctor) ? prescription.doctor._id : prescription.doctor,
      medications: prescription.medications.map(med => ({
        medicationId: typeof med.medicationId === 'object' && med.medicationId !== null
          ? med.medicationId._id
          : med.medicationId,
        quantity: med.quantity,
      })),
      date: new Date(prescription.date),
    });
    setEditingId(prescription._id);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Gestión de Prescripciones
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 600 }}>
          <form onSubmit={e => { e.preventDefault(); createOrUpdate(); }}>
            <Stack spacing={2}>
              <TextField
                select
                label="Paciente"
                value={form.patient}
                onChange={e => setForm({ ...form, patient: e.target.value })}
                required
              >
                <MenuItem value="">Selecciona un paciente</MenuItem>
                {patients.map((patient) => (
                  <MenuItem key={patient._id} value={patient._id}>
                    {`${patient.firstName} ${patient.lastName}`}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Doctor"
                value={form.doctor}
                onChange={e => setForm({ ...form, doctor: e.target.value })}
                required
              >
                <MenuItem value="">Selecciona un doctor</MenuItem>
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    {`${doctor.firstName} ${doctor.lastName} (${doctor.specialty})`}
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="subtitle1">Medicamentos:</Typography>
              <Stack spacing={1}>
                {form.medications.map((med, index) => (
                  <Stack direction="row" spacing={1} key={index}>
                    <TextField
                      select
                      label="Medicamento"
                      value={med.medicationId}
                      onChange={e =>
                        setForm({
                          ...form,
                          medications: form.medications.map((m, i) =>
                            i === index ? { ...m, medicationId: e.target.value } : m
                          ),
                        })
                      }
                      sx={{ flex: 1 }}
                    >
                      <MenuItem value="">Selecciona un medicamento</MenuItem>
                      {medications.map((medication) => (
                        <MenuItem key={medication._id} value={medication._id}>
                          {medication.name} ({medication.quantity} disponibles)
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Cantidad"
                      type="number"
                      value={med.quantity}
                      onChange={e =>
                        setForm({
                          ...form,
                          medications: form.medications.map((m, i) =>
                            i === index ? { ...m, quantity: parseInt(e.target.value) || 1 } : m
                          ),
                        })
                      }
                      sx={{ width: 100 }}
                      inputProps={{ min: 1 }}
                      required
                    />
                    <IconButton
                      onClick={() =>
                        setForm({
                          ...form,
                          medications: form.medications.filter((_, i) => i !== index),
                        })
                      }
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  type="button"
                  onClick={() => setForm({ ...form, medications: [...form.medications, { medicationId: '', quantity: 1 }] })}
                  color="primary"
                  variant="outlined"
                  sx={{ width: 'fit-content' }}
                >
                  Agregar Medicamento
                </Button>
              </Stack>
              <TextField
                label="Fecha"
                type="date"
                value={form.date.toISOString().split('T')[0]}
                onChange={e => setForm({ ...form, date: new Date(e.target.value) })}
                InputLabelProps={{ shrink: true }}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Lista de Prescripciones</Typography>
          <List>
            {prescriptions.map((prescription) => (
              <ListItem
                key={prescription._id}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(prescription)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deletePrescription(prescription._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={
                    `Paciente: ${
                      isPatientObject(prescription.patient)
                        ? `${prescription.patient.firstName} ${prescription.patient.lastName}`
                        : prescription.patient
                    } | Doctor: ${
                      isDoctorObject(prescription.doctor)
                        ? `${prescription.doctor.firstName} ${prescription.doctor.lastName} (${prescription.doctor.specialty})`
                        : prescription.doctor
                    }`
                  }
                  secondary={
                    <>
                      Medicamentos: {
                        prescription.medications.map((med: Prescription['medications'][number]) => {
                          // Si med.medicationId es objeto, muestra el nombre, si no, muestra el id
                          if (med.medicationId && typeof med.medicationId === 'object' && 'name' in med.medicationId) {
                            return `${med.medicationId.name} (${med.quantity})`;
                          }
                          // Si no tiene nombre, muestra el id
                          return `${med.medicationId} (${med.quantity})`;
                        }).join(', ')
                      }
                      <br />
                      Fecha: {new Date(prescription.date).toLocaleDateString()}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Prescriptions;