import React, { useEffect, useState } from 'react';
import TablaDinamica from '../../components/TablaDinamica';
import { Box, Typography, Paper } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

type Medicamento = {
  name: string;
  description?: string;
  quantity: number;
  usedInPrescriptions: number;
  createdAt?: string;
  updatedAt?: string;
};

const columns: ColumnDef<Medicamento>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'description', header: 'Descripción' },
  { accessorKey: 'quantity', header: 'Cantidad' },
  { accessorKey: 'usedInPrescriptions', header: 'Veces Prescrito' },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: info => info.getValue() ? new Date(info.getValue() as string).toLocaleDateString() : '',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'updatedAt',
    header: 'Actualizado',
    cell: info => info.getValue() ? new Date(info.getValue() as string).toLocaleDateString() : '',
    enableColumnFilter: false,
  },
];

const ReporteInventarioMedicamentos: React.FC = () => {
  const [data, setData] = useState<Medicamento[]>([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/reports/medications-inventory', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (!res.ok) throw new Error('Error al obtener inventario');
      const json = await res.json();
      setData(json);
    } catch {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Inventario de Medicamentos
        </Typography>
      </Paper>
      <TablaDinamica data={data} columns={columns} title="Inventario Medicamentos" />
    </Box>
  );
};

export default ReporteInventarioMedicamentos;
