const IAppointmentRepository = require('../../domain/interfaces/IAppointmentRepository');
const AppointmentModel = require('../persistence/mongoose/appointmentModel');
class AppointmentRepository extends IAppointmentRepository {
  async findAll() {
    return AppointmentModel.find({})
      .populate('patient')
      .populate('doctor')
      .populate('prescriptionId');
  }
  async findById(id) {
    return AppointmentModel.findById(id)
      .populate('patient')
      .populate('doctor')
      .populate('prescriptionId');
  }
  async create(data) { return AppointmentModel.create(data); }
  async update(id,data) { return AppointmentModel.findByIdAndUpdate(id,data,{new:true}); }
  async delete(id) { return AppointmentModel.findByIdAndDelete(id); }
}
module.exports = AppointmentRepository;