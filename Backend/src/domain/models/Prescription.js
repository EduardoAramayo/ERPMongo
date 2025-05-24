class Prescription {
    constructor({ id, patientId, doctorId, medications, date, createdAt, updatedAt }) {
      this.id = id;
      this.patientId = patientId;
      this.doctorId = doctorId;
      this.medications = medications;
      this.date = date;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  module.exports = Prescription;