import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button, Stack, Box
} from '@mui/material';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type TablaDinamicaProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  title?: string;
};

function TablaDinamica<T extends object>({ data, columns, title }: TablaDinamicaProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
  });

  // Export helpers
  const exportExcel = () => {
    const exportData = table.getFilteredRowModel().rows.map(row => row.original);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${title || 'tabla'}-export.xlsx`);
  };

  const exportCSV = () => {
    const exportData = table.getFilteredRowModel().rows.map(row => row.original);
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'tabla'}-export.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const exportData = table.getFilteredRowModel().rows.map(row => row.original);
    const doc = new jsPDF({ orientation: 'landscape' });
    const headers = table.getAllLeafColumns().map(col => col.columnDef.header as string);
    const body = exportData.map(row =>
      table.getAllLeafColumns().map(col => {
        // Use accessorFn if available, otherwise try accessorKey, otherwise empty string
        if (typeof col.accessorFn === 'function') {
          return col.accessorFn(row, 0) ?? '';
        } else if ('accessorKey' in col.columnDef && typeof col.columnDef.accessorKey === 'string') {
          const key = col.columnDef.accessorKey as string;
          return (row as Record<string, unknown>)[key] ?? '';
        }
        return '';
      })
    );
    autoTable(doc, {
      head: [headers],
      body,
      styles: { fontSize: 9 },
      margin: { top: 20 },
    });
    doc.save(`${title || 'tabla'}-export.pdf`);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="outlined" onClick={exportExcel}>Exportar Excel</Button>
        <Button variant="outlined" onClick={exportCSV}>Exportar CSV</Button>
        <Button variant="outlined" onClick={exportPDF}>Exportar PDF</Button>
      </Stack>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {table.getHeaderGroups()[0].headers.map(header => (
                <TableCell key={header.id}>
                  <Stack spacing={1}>
                    <Box
                      sx={{ cursor: header.column.getCanSort() ? 'pointer' : undefined }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && ' 🔼'}
                      {header.column.getIsSorted() === 'desc' && ' 🔽'}
                    </Box>
                    {header.column.getCanFilter() && (
                      <TextField
                        size="small"
                        variant="standard"
                        placeholder="Filtrar..."
                        value={(header.column.getFilterValue() ?? '') as string}
                        onChange={e => header.column.setFilterValue(e.target.value)}
                        sx={{ minWidth: 80 }}
                      />
                    )}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Sin datos
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={table.getFilteredRowModel().rows.length}
        page={pageIndex}
        onPageChange={(_, newPage) => setPageIndex(newPage)}
        rowsPerPage={pageSize}
        onRowsPerPageChange={e => {
          setPageSize(Number(e.target.value));
          setPageIndex(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}

export default TablaDinamica;
