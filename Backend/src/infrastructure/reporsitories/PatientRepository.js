const IPatientRepository = require('../../domain/interfaces/IPatientRepository');
const PatientModel = require('../persistence/mongoose/patientModel');

class PatientRepository extends IPatientRepository {
  async findAll() {
    return PatientModel.find({});
  }

  async findById(id) {
    return PatientModel.findById(id);
  }

  async create(data) {
    return PatientModel.create(data);
  }

  async update(id, data) {
    return PatientModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return PatientModel.findByIdAndDelete(id);
  }
}

module.exports = PatientRepository;