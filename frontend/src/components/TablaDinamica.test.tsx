import { render, screen, fireEvent } from '@testing-library/react';
import TablaDinamica from './TablaDinamica';
import { ColumnDef } from '@tanstack/react-table';

type Row = { nombre: string; cantidad: number };

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'nombre', header: 'Nombre' },
  { accessorKey: 'cantidad', header: 'Cantidad' },
];

const data: Row[] = [
  { nombre: 'Paracetamol', cantidad: 10 },
  { nombre: 'Ibuprofeno', cantidad: 5 },
];

describe('TablaDinamica', () => {
  it('renderiza las columnas y datos', () => {
    render(<TablaDinamica data={data} columns={columns} />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('Paracetamol')).toBeInTheDocument();
    expect(screen.getByText('Ibuprofeno')).toBeInTheDocument();
  });

  it('filtra los datos por columna', () => {
    render(<TablaDinamica data={data} columns={columns} />);
    const filterInput = screen.getAllByPlaceholderText('Filtrar...')[0];
    fireEvent.change(filterInput, { target: { value: 'Ibu' } });
    expect(screen.queryByText('Paracetamol')).not.toBeInTheDocument();
    expect(screen.getByText('Ibuprofeno')).toBeInTheDocument();
  });

  it('muestra botones de exportación', () => {
    render(<TablaDinamica data={data} columns={columns} />);
    expect(screen.getByText(/Exportar Excel/i)).toBeInTheDocument();
    expect(screen.getByText(/Exportar CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Exportar PDF/i)).toBeInTheDocument();
  });
});
