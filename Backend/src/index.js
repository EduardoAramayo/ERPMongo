const express = require('express');
const cors = require('cors');
const connectDB = require('./infrastructure/db');
require('dotenv').config();

// Configuración segura de CORS para permitir solo tu frontend
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

(async()=>{
  await connectDB();
  const app = express();
  app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  app.use('/api/auth', require('./interfaces/routes/authRoutes'));
  app.use('/api/users', require('./interfaces/routes/userRoutes'));
  app.use('/api/patients', require('./interfaces/routes/patientRoutes'));
  app.use('/api/appointments', require('./interfaces/routes/appointmentRoutes'));
  app.use('/api/prescriptions', require('./interfaces/routes/prescriptionRoutes'));
  app.use('/api/medications', require('./interfaces/routes/medicationRoutes'));
  app.use('/api/doctors', require('./interfaces/routes/doctorRoutes'));
  app.use('/api/reports', require('./interfaces/routes/reportRoutes'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log(`Servidor en ${PORT}`));
})();