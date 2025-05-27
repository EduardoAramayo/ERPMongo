// src/features/appointments/Appointments.tsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, IconButton, Stack, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../../components/Sidebar';
import useAppointments from './hooks/useAppointments';
import api from '../../api/api';

// Tipos explícitos
interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
}

interface Prescription {
  _id: string;
  patient: string | Patient;
  doctor: string | Doctor;
  medications: string[]; // Replace with Medication[] if you have a Medication interface
  date: string | Date;
}

interface Appointment {
  _id: string;
  patient: string | Patient;
  doctor: string | Doctor;
  prescriptionId?: string | Prescription;
  date: string | Date;
  status: 'pendiente' | 'confirmada' | 'cancelada';
}

const Appointments: React.FC = () => {
  const {
    appointments, patients, doctors, form, setForm, editingId, setEditingId, createOrUpdate, deleteAppointment
  } = useAppointments();

  // Obtener las prescripciones para el select
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  useEffect(() => {
    api.get('/prescriptions').then(res => setPrescriptions(res.data));
  }, []);

  const handleEdit = (appointment: Appointment) => {
    setForm({
      patient: typeof appointment.patient === 'object' && appointment.patient !== null
        ? appointment.patient._id
        : appointment.patient,
      doctor: typeof appointment.doctor === 'object' && appointment.doctor !== null
        ? appointment.doctor._id
        : appointment.doctor,
      prescriptionId: (appointment.prescriptionId && typeof appointment.prescriptionId === 'object')
        ? (appointment.prescriptionId as Prescription)._id
        : appointment.prescriptionId || '',
      date: new Date(appointment.date),
      status: appointment.status,
    });
    setEditingId(appointment._id);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Gestión de Citas
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 500 }}>
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
              <TextField
                select
                label="Prescripción"
                value={form.prescriptionId}
                onChange={e => setForm({ ...form, prescriptionId: e.target.value })}
                required
              >
                <MenuItem value="">Selecciona una prescripción</MenuItem>
                {prescriptions.map((prescription) => (
                  <MenuItem key={prescription._id} value={prescription._id}>
                    {prescription.patient && typeof prescription.patient === 'object'
                      ? `${prescription.patient.firstName} ${prescription.patient.lastName}`
                      : prescription.patient
                    }
                    {' - '}
                    {new Date(prescription.date).toLocaleDateString()}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Fecha"
                type="datetime-local"
                value={new Date(form.date).toISOString().slice(0, 16)}
                onChange={e => setForm({ ...form, date: new Date(e.target.value) })}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Estado"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as 'pendiente' | 'confirmada' | 'cancelada' })}
                required
              >
                <MenuItem value="pendiente">Pendiente</MenuItem>
                <MenuItem value="confirmada">Confirmada</MenuItem>
                <MenuItem value="cancelada">Cancelada</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {editingId ? 'Actualizar' : 'Crear'}
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Lista de Citas</Typography>
          <List>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <ListItem
                  key={appointment._id}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton onClick={() => handleEdit(appointment)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteAppointment(appointment._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={`Paciente: ${
                      appointment.patient && typeof appointment.patient === 'object'
                        ? `${(appointment.patient as Patient).firstName} ${(appointment.patient as Patient).lastName}`
                        : appointment.patient
                    } | Doctor: ${
                      appointment.doctor && typeof appointment.doctor === 'object'
                        ? `${(appointment.doctor as Doctor).firstName} ${(appointment.doctor as Doctor).lastName} (${(appointment.doctor as Doctor).specialty})`
                        : appointment.doctor
                    }`}
                    secondary={`Fecha: ${new Date(appointment.date).toLocaleString()} | Estado: ${appointment.status} | Prescripción: ${
                      appointment.prescriptionId && typeof appointment.prescriptionId === 'object'
                        ? ((appointment.prescriptionId as Prescription).patient && typeof (appointment.prescriptionId as Prescription).patient === 'object'
                            ? `${((appointment.prescriptionId as Prescription).patient as Patient).firstName} ${((appointment.prescriptionId as Prescription).patient as Patient).lastName}`
                            : (appointment.prescriptionId as Prescription).patient
                          ) + ' - ' + new Date((appointment.prescriptionId as Prescription).date).toLocaleDateString()
                        : appointment.prescriptionId || 'N/A'
                    }`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No hay citas disponibles.</Typography>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Appointments;