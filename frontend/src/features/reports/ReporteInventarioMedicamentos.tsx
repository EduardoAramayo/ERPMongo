import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, CircularProgress, Alert, Button, Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import api from '../../api/api';
// @ts-ignore
import * as Stimulsoft from 'stimulsoft-reports-js';

const ReporteInventarioMedicamentos: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const reportRef = useRef<any>(null);

  useEffect(() => {
    setLoading(true);
    setReportError(null);

    api.get('/reports/medications-inventory')
      .then(res => {
        const Sti = Stimulsoft;
        Sti.Base.StiLicense.key = 'YOUR_STIMULSOFT_KEY';

        // Corrección: Instanciar el reporte correctamente
        let report = new Sti.StiReport();
        report.dictionary.databases.clear();
        report.dictionary.databases.add(
          new Sti.Dictionary.StiJsonDatabase(
            "JSON",
            `${import.meta.env.VITE_API_URL || ''}/reports/medications-inventory`
          )
        );

        let page = report.pages.getByIndex(0);
        page.name = "InventarioMedicamentos";

        // Banda de datos
        let dataBand = new Sti.Components.StiDataBand();
        dataBand.dataSourceName = "JSON";
        dataBand.height = 1;

        // Ejemplo de columnas
        const columns = [
          { field: "name", title: "Nombre", width: 60 },
          { field: "description", title: "Descripción", width: 80 },
          { field: "quantity", title: "Cantidad", width: 30 },
          { field: "createdAt", title: "Creado", width: 40 },
          { field: "updatedAt", title: "Actualizado", width: 40 },
          { field: "usedInPrescriptions", title: "Usado en Prescripciones", width: 40 }
        ];

        let x = 0;
        columns.forEach(col => {
          let header = new Sti.Components.StiText();
          header.text = col.title;
          header.width = col.width;
          header.height = 0.8;
          header.left = x;
          header.top = 0;
          header.font = "Arial";
          header.fontSize = 10;
          header.bold = true;
          page.components.add(header);

          let text = new Sti.Components.StiText();
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

        // Limpia el visor antes de renderizar
        const viewerDiv = document.getElementById('stimulsoft-viewer');
        if (viewerDiv) viewerDiv.innerHTML = '';

        const viewer = new Sti.Viewer.StiViewer(null, 'StiViewer', false);
        viewer.report = report;
        viewer.renderHtml('stimulsoft-viewer');
        reportRef.current = report;
        setLoading(false);
      })
      .catch(() => {
        setReportError('Error al cargar el reporte');
        setLoading(false);
      });
  }, []);

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
        a.download = 'InventarioMedicamentos.pdf';
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
        a.download = 'InventarioMedicamentos.xlsx';
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
          Reporte: Inventario de Medicamentos
        </Typography>
        <Paper sx={{ p: 3, mb: 4, maxWidth: 500 }}>
          Este reporte muestra el inventario actual de medicamentos.
        </Paper>
        <Stack direction="row" spacing={2} mb={2}>
          <Button variant="contained" color="primary" onClick={handleExportPDF}>
            Exportar PDF
          </Button>
          <Button variant="contained" color="success" onClick={handleExportExcel}>
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

export default ReporteInventarioMedicamentos;
