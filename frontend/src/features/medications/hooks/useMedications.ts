import { useState, useEffect, FormEvent } from 'react';
import api from '../../../api/api';
import { toast } from 'react-toastify';

interface Medication {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
  expiryDate?: Date;
}

// Interfaz parcial para el error de la API
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const useMedications = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [form, setForm] = useState<Omit<Medication, '_id'>>({
    name: '',
    description: '',
    quantity: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchMedications = async () => {
    try {
      const { data } = await api.get<Medication[]>('/medications');
      setMedications(data);
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al obtener medicamentos');
    }
  };

  useEffect(() => { fetchMedications(); }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/medications/${editingId}`, form);
        setEditingId(null);
        toast.success('Medicamento actualizado correctamente');
      } else {
        await api.post('/medications', form);
        toast.success('Medicamento creado correctamente');
      }
      setForm({ name: '', description: '', quantity: 0 });
      fetchMedications();
    } catch (error) {
      const err = error as ApiError;
      console.error(error);
      toast.error(err.response?.data?.message || 'Error al guardar medicamento');
    }
  };

  const handleEdit = (medication: Medication) => {
    setForm({
      name: medication.name,
      description: medication.description || '',
      quantity: medication.quantity,
    });
    setEditingId(medication._id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este medicamento?')) {
      try {
        await api.delete(`/medications/${id}`);
        fetchMedications();
        toast.success('Medicamento eliminado correctamente');
      } catch (error) {
        const err = error as ApiError;
        console.error(error);
        toast.error(err.response?.data?.message || 'Error al eliminar medicamento');
      }
    }
  };

  return { medications, form, setForm, editingId, setEditingId, handleSubmit, handleEdit, handleDelete };
};

export default useMedications;
