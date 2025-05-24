class Doctor {
  constructor({ id, firstName, lastName, specialty, createdAt, updatedAt }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.specialty = specialty;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
module.exports = Doctor;
