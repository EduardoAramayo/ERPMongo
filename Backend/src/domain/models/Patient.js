class Patient {
    constructor({ id, firstName, lastName, dob, email, phone, medicalHistory, createdAt, updatedAt }) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dob = dob;
      this.email = email;
      this.phone = phone;
      this.medicalHistory = medicalHistory || [];
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  module.exports = Patient;