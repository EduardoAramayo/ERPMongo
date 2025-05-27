import { useState, useEffect, FormEvent } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
}

// Interfaz parcial para el error de la API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const useDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Omit<Doctor, '_id'>>({
    firstName: '',
    lastName: '',
    specialty: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get<Doctor[]>('/doctors');
      setDoctors(data);
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al obtener doctores');
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, form);
        setEditingId(null);
        toast.success('Doctor actualizado correctamente');
      } else {
        await api.post('/doctors', form);
        toast.success('Doctor creado correctamente');
      }
      setForm({ firstName: '', lastName: '', specialty: '' });
      fetchDoctors();
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al guardar doctor');
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setForm({ firstName: doctor.firstName, lastName: doctor.lastName, specialty: doctor.specialty });
    setEditingId(doctor._id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este doctor?')) {
      try {
        await api.delete(`/doctors/${id}`);
        fetchDoctors();
        toast.success('Doctor eliminado correctamente');
      } catch (error) {
        const err = error as ApiError;
        console.error(error);
        toast.error(err.response?.data?.message || 'Error al eliminar doctor');
      }
    }
  };

  return { doctors, form, setForm, editingId, setEditingId, handleSubmit, handleEdit, handleDelete };
};

export default useDoctor;
