const IMedicationRepository = require('../../domain/interfaces/IMedicationRepository');
const MedicationModel = require('../persistence/mongoose/medicationModel');

class MedicationRepository extends IMedicationRepository {
  async findAll() {
    return MedicationModel.find({});
  }

  async findById(id) {
    return MedicationModel.findById(id);
  }

  async create(data) {
    return MedicationModel.create(data);
  }

  async update(id, data) {
    return MedicationModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return MedicationModel.findByIdAndDelete(id);
  }
}

module.exports = MedicationRepository;