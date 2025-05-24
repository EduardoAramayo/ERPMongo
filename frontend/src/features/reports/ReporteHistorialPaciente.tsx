import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, MenuItem, TextField, CircularProgress, Alert, Button, Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import api from '../../api/api';
// @ts-ignore
import * as Stimulsoft from 'stimulsoft-reports-js';

const ReporteHistorialPaciente: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const reportRef = useRef<any>(null);

  useEffect(() => {
    api.get('/patients')
      .then(res => setPatients(res.data))
      .catch(() => setPatients([]));
  }, []);

  useEffect(() => {
    if (!selectedPatient) return;
    setLoading(true);
    setReportError(null);

    // Crear reporte dinámico
    const Sti = Stimulsoft;
    Sti.Base.StiLicense.key = 'YOUR_STIMULSOFT_KEY';

    let report = Sti.Report.StiReport.createNewReport();
    report.dictionary.databases.clear();
    report.dictionary.databases.add(
      new Sti.Report.Dictionary.StiJsonDatabase(
        "JSON",
        `${import.meta.env.VITE_API_URL || ''}/reports/patient-history/${selectedPatient}`
      )
    );

    let page = report.pages.getByIndex(0);
    page.name = "HistorialPaciente";

    // Banda de datos
    let dataBand = new Sti.Report.Components.StiDataBand();
    dataBand.dataSourceName = "JSON";
    dataBand.height = 1;

    // Ejemplo de columnas
    const columns = [
      { field: "doctorName", title: "Doctor", width: 60 },
      { field: "doctorSpecialty", title: "Especialidad", width: 40 },
      { field: "appointmentDate", title: "Fecha Cita", width: 40 },
      { field: "appointmentStatus", title: "Estado", width: 30 },
      { field: "prescriptionDate", title: "Fecha Receta", width: 40 },
      { field: "medications", title: "Medicamentos", width: 80 }
    ];

    let x = 0;
    columns.forEach(col => {
      let header = new Sti.Report.Components.StiText();
      header.text = col.title;
      header.width = col.width;
      header.height = 0.8;
      header.left = x;
      header.top = 0;
      header.font = "Arial";
      header.fontSize = 10;
      header.bold = true;
      page.components.add(header);

      let text = new Sti.Report.Components.StiText();
      text.text = `{JSON.${col.field}}`;
      text.width = col.width;
      text.height = 0.8;
      text.left = x;
      text.top = 1;
      text.font = "Arial";
      text.fontSize = 10;
      dataBand.components.add(text);

      x += col.width;
    });

    page.components.add(dataBand);

    // Renderizar visor
    const viewerDiv = document.getElementById('stimulsoft-viewer');
    if (viewerDiv) viewerDiv.innerHTML = '';

    const viewer = new Sti.Viewer.StiViewer(null, 'StiViewer', false);
    viewer.report = report;
    viewer.renderHtml('stimulsoft-viewer');
    reportRef.current = report;
    setLoading(false);
  }, [selectedPatient]);

  // Exportar PDF
  const handleExportPDF = () => {
    if (reportRef.current) {
      reportRef.current.renderAsync(() => {
        const settings = new Stimulsoft.Report.Export.StiPdfExportSettings();
        const service = new Stimulsoft.Report.Export.StiPdfExportService();
        const stream = new Stimulsoft.System.IO.MemoryStream();
        service.exportTo(reportRef.current, stream, settings);
        const data = stream.toArray();
        const blob = new Blob([new Uint8Array(data)], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialPaciente.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  };

  // Exportar Excel
  const handleExportExcel = () => {
    if (reportRef.current) {
      reportRef.current.renderAsync(() => {
        const settings = new Stimulsoft.Report.Export.StiExcel2007ExportSettings();
        const service = new Stimulsoft.Report.Export.StiExcel2007ExportService();
        const stream = new Stimulsoft.System.IO.MemoryStream();
        service.exportTo(reportRef.current, stream, settings);
        const data = stream.toArray();
        const blob = new Blob([new Uint8Array(data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialPaciente.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Reporte: Historial de Consultas por Paciente
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 500 }}>
          <TextField
            select
            label="Selecciona un paciente"
            value={selectedPatient}
            onChange={e => setSelectedPatient(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Seleccione...</MenuItem>
            {patients.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.firstName} {p.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Paper>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" color="primary" onClick={handleExportPDF} disabled={!selectedPatient}>
            Exportar PDF
          </Button>
          <Button variant="contained" color="success" onClick={handleExportExcel} disabled={!selectedPatient}>
            Exportar Excel
          </Button>
        </Stack>
        {loading && <CircularProgress />}
        {reportError && <Alert severity="error">{reportError}</Alert>}
        <div id="stimulsoft-viewer" style={{ width: '100%', height: '700px', background: '#fff' }} />
      </Box>
    </Box>
  );
};

export default ReporteHistorialPaciente;
