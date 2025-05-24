// src/features/appointments/hooks/useAppointments.ts
import { useState, useEffect } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';

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

interface Appointment {
  _id: string;
  patient: string;
  doctor: string;
  prescriptionId?: string;
  date: Date;
  status: 'pendiente' | 'confirmada' | 'cancelada';
}

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Omit<Appointment, '_id'>>({
    patient: '',
    doctor: '',
    prescriptionId: '',
    date: new Date(),
    status: 'pendiente',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data
  const fetchAllData = async () => {
    try {
      const [appointmentsData, patientsData, doctorsData] = await Promise.all([
        api.get('/appointments'),
        api.get('/patients'),
        api.get('/doctors'),
      ]);
      setAppointments(appointmentsData.data);
      setPatients(patientsData.data);
      setDoctors(doctorsData.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error al obtener datos');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // CRUD operations
  const createOrUpdate = async () => {
    try {
      if (editingId) {
        await api.put(`/appointments/${editingId}`, form);
        setEditingId(null);
        toast.success('Cita actualizada correctamente');
      } else {
        await api.post('/appointments', form);
        toast.success('Cita creada correctamente');
      }
      setForm({ patient: '', doctor: '', prescriptionId: '', date: new Date(), status: 'pendiente' });
      await fetchAllData();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error al guardar cita');
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await api.delete(`/appointments/${id}`);
      await fetchAllData();
      toast.success('Cita eliminada correctamente');
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error al eliminar cita');
    }
  };

  return {
    appointments,
    patients,
    doctors,
    form,
    setForm,
    editingId,
    setEditingId,
    createOrUpdate,
    deleteAppointment,
  };
};

export default useAppointments;