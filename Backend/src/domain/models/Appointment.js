class Appointment {
    constructor({ id, patientId, doctorId, prescriptionId, date, status, createdAt, updatedAt }) {
      this.id = id;
      this.patientId = patientId;
      this.doctorId = doctorId;
      this.prescriptionId = prescriptionId;
      this.date = date;
      this.status = status || 'pendiente';
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  module.exports = Appointment;