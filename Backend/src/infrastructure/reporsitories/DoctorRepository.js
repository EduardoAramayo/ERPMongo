const DoctorModel = require('../persistence/mongoose/doctorModel');

class DoctorRepository {
  async findAll() {
    return DoctorModel.find({});
  }
  async findById(id) {
    return DoctorModel.findById(id);
  }
  async create(data) {
    return DoctorModel.create(data);
  }
  async update(id, data) {
    return DoctorModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return DoctorModel.findByIdAndDelete(id);
  }
}

module.exports = DoctorRepository;
