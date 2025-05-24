import { useState, useEffect, FormEvent } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState<Omit<Patient, '_id'>>({ firstName: '', lastName: '', email: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchPatients = async () => {
    try {
      const { data } = await api.get<Patient[]>('/patients');
      setPatients(data);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error al obtener pacientes');
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/patients/${editingId}`, form);
        setEditingId(null);
        toast.success('Paciente actualizado correctamente');
      } else {
        await api.post('/patients', form);
        toast.success('Paciente creado correctamente');
      }
      setForm({ firstName: '', lastName: '', email: '' });
      await fetchPatients();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Error al guardar paciente');
    }
  };

  const handleEdit = (patient: Patient) => {
    setForm({ firstName: patient.firstName, lastName: patient.lastName, email: patient.email });
    setEditingId(patient._id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro?')) {
      try {
        await api.delete(`/patients/${id}`);
        await fetchPatients();
        toast.success('Paciente eliminado correctamente');
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || 'Error al eliminar paciente');
      }
    }
  };

  return { patients, form, setForm, editingId, setEditingId, handleSubmit, handleEdit, handleDelete };
};

export default usePatients;
