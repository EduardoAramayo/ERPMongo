const MedicationModel = require('../../infrastructure/persistence/mongoose/medicationModel');

class PrescriptionService {
    constructor(repo) { this.repo = repo; }
    async getAll() { return this.repo.findAll(); }
    async getById(id) { return this.repo.findById(id); }
    async create(data) {
      // Validar y descontar cantidad de medicamentos
      if (Array.isArray(data.medications)) {
        for (const med of data.medications) {
          if (med.medicationId && med.quantity) {
            const medication = await MedicationModel.findById(med.medicationId);
            if (!medication) throw new Error('Medicamento no encontrado');
            if (medication.quantity < med.quantity) {
              throw new Error(`Stock insuficiente para ${medication.name}`);
            }
          }
        }
        // Si todo ok, descontar
        for (const med of data.medications) {
          await MedicationModel.findByIdAndUpdate(
            med.medicationId,
            { $inc: { quantity: -Math.abs(med.quantity) } }
          );
        }
      }
      return this.repo.create(data);
    }
    async update(id, data) { return this.repo.update(id, data); }
    async delete(id) { return this.repo.delete(id); }
}
module.exports = PrescriptionService;