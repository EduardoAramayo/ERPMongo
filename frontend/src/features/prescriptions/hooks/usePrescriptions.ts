// src/features/prescriptions/hooks/usePrescriptions.ts
import { useState, useEffect } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Medication {
  _id: string;
  name: string;
  quantity: number;
}

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
}

interface Prescription {
  _id: string;
  patient: string;
  doctor: string;
  medications: { medicationId: string; quantity: number }[];
  date: Date;
}

// Interfaz parcial para el error de la API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Omit<Prescription, '_id'>>({
    patient: '',
    doctor: '',
    medications: [],
    date: new Date(),
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch data
  const fetchAllData = async () => {
    try {
      const [prescriptionsData, patientsData, medicationsData, doctorsData] = await Promise.all([
        api.get('/prescriptions'),
        api.get('/patients'),
        api.get('/medications'),
        api.get('/doctors'),
      ]);
      setPrescriptions(prescriptionsData.data);
      setPatients(patientsData.data);
      setMedications(medicationsData.data);
      setDoctors(doctorsData.data);
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al obtener prescripciones');
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // CRUD operations
  const createOrUpdate = async () => {
    try {
      if (editingId) {
        await api.put(`/prescriptions/${editingId}`, form);
        setEditingId(null);
        toast.success('Prescripción actualizada correctamente');
      } else {
        await api.post('/prescriptions', form);
        toast.success('Prescripción creada correctamente');
      }
      setForm({ patient: '', doctor: '', medications: [], date: new Date() });
      await fetchAllData();
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al guardar prescripción');
    }
  };

  const deletePrescription = async (id: string) => {
    try {
      await api.delete(`/prescriptions/${id}`);
      await fetchAllData();
      toast.success('Prescripción eliminada correctamente');
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al eliminar prescripción');
    }
  };

  return {
    prescriptions,
    patients,
    medications,
    doctors,
    form,
    setForm,
    editingId,
    setEditingId,
    createOrUpdate,
    deletePrescription,
  };
};

export default usePrescriptions;