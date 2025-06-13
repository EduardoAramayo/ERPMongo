// src/components/Sidebar.tsx
import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import theme from '../theme';

const drawerWidth = 240;

const Sidebar: React.FC = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    {/* Encabezado del Sidebar */}
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        ERP Clínica
      </Typography>
    </Toolbar>

    {/* Lista de enlaces del Sidebar */}
    <List>
      {[
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Pacientes', to: '/patients' },
        { text: 'Citas', to: '/appointments' },
        { text: 'Medicamentos', to: '/medications' },
        { text: 'Prescripciones', to: '/prescriptions' },
        { text: 'Doctores', to: '/doctors' },
        // Nuevos enlaces de reportes
        { text: 'Reporte Consultas Paciente', to: '/reportes/consultas-paciente' },
        { text: 'Reporte Inventario Medicamentos', to: '/reportes/inventario-medicamentos' },
      ].map(({ text, to }) => (
        <ListItemButton
          key={to}
          component={NavLink}
          to={to}
          sx={{
            '&.active': {
              backgroundColor: theme.palette.action.selected,
              color: theme.palette.primary.main,
            },
          }}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;