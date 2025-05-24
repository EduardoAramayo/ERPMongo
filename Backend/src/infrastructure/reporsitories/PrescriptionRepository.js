const IPrescriptionRepository = require('../../domain/interfaces/IPrescriptionRepository');
const PrescriptionModel = require('../persistence/mongoose/prescriptionModel');

class PrescriptionRepository extends IPrescriptionRepository {
  async findAll() {
    return PrescriptionModel.find({})
      .populate('patient')
      .populate('doctor')
      .populate('medications.medicationId');
  }

  async findById(id) {
    return PrescriptionModel.findById(id)
      .populate('patient')
      .populate('doctor')
      .populate('medications.medicationId');
  }

  async create(data) {
    return PrescriptionModel.create(data);
  }

  async update(id, data) {
    return PrescriptionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return PrescriptionModel.findByIdAndDelete(id);
  }
}

module.exports = PrescriptionRepository;