const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);