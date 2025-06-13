import React, { useEffect, useState, FormEvent } from 'react';
import TablaDinamica from '../../components/TablaDinamica';
import { Box, Typography, Paper, TextField, Button, CircularProgress, Autocomplete } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

type Consulta = {
  appointmentDate: string;
  appointmentStatus: string;
  doctorName: string;
  doctorSpecialty: string;
  prescriptionDate: string;
  medications: { name: string; quantity: number }[];
};

type Patient = {
  _id: string;
  firstName: string;
  lastName: string;
};

const columns: ColumnDef<Consulta>[] = [
  { accessorKey: 'appointmentDate', header: 'Fecha Consulta', cell: info => new Date(info.getValue() as string).toLocaleDateString() },
  { accessorKey: 'appointmentStatus', header: 'Estado' },
  { accessorKey: 'doctorName', header: 'Doctor' },
  { accessorKey: 'doctorSpecialty', header: 'Especialidad' },
  { accessorKey: 'prescriptionDate', header: 'Fecha Prescripción', cell: info => new Date(info.getValue() as string).toLocaleDateString() },
  {
    accessorKey: 'medications',
    header: 'Medicamentos',
    cell: info =>
      Array.isArray(info.getValue())
        ? (info.getValue() as Consulta['medications'])
            .map(m => `${m.name} (${m.quantity})`)
            .join(', ')
        : '',
    enableColumnFilter: false,
  },
];

const ReporteConsultasPaciente: React.FC = () => {
  const [data, setData] = useState<Consulta[]>([]);
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [loadingPatientsList, setLoadingPatientsList] = useState(false);
  const [loading, setLoading] = useState(false);

  // Para el Autocomplete
  const [searchText, setSearchText] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Obtener lista de pacientes al montar
  useEffect(() => {
    setLoadingPatientsList(true);
    fetch('http://localhost:5000/api/patients', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      },
    })
      .then(res => res.json())
      .then((list: Patient[]) => setPatientsList(list))
      .catch(() => setPatientsList([]))
      .finally(() => setLoadingPatientsList(false));
  }, []);

  // Buscar historial por paciente seleccionado
  const fetchData = async (patientId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/reports/patient-history/${patientId}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (!res.ok) throw new Error('Error al obtener historial');
      const json = await res.json();
      setData(json);
    } catch {
      setData([]);
    }
    setLoading(false);
  };

  // Filtrar pacientes para sugerencias
  const filteredPatients = searchText
    ? patientsList.filter(
        p =>
          p.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          p.lastName.toLowerCase().includes(searchText.toLowerCase())
      )
    : patientsList;

  // Manejar submit del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedPatient && selectedPatient._id) {
      fetchData(selectedPatient._id);
    } else {
      setData([]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Historial de Consultas por Paciente
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={filteredPatients}
            getOptionLabel={option => `${option.firstName} ${option.lastName}`}
            loading={loadingPatientsList}
            value={selectedPatient}
            onChange={(_, value) => setSelectedPatient(value)}
            inputValue={searchText}
            onInputChange={(_, value) => setSearchText(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Buscar paciente por nombre o apellido"
                variant="outlined"
                size="small"
                sx={{ mr: 2, width: 320 }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingPatientsList ? <CircularProgress color="inherit" size={18} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            noOptionsText={searchText ? 'No se encontraron pacientes' : 'Escribe para buscar'}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!selectedPatient || loading}
            sx={{ ml: 2, minWidth: 120 }}
          >
            {loading ? <CircularProgress size={20} /> : 'Buscar'}
          </Button>
        </form>
      </Paper>
      <TablaDinamica data={data} columns={columns} title="Historial Consultas" />
    </Box>
  );
};

export default ReporteConsultasPaciente;
