const AppointmentModel = require('../../infrastructure/persistence/mongoose/appointmentModel');
const PrescriptionModel = require('../../infrastructure/persistence/mongoose/prescriptionModel');
const MedicationModel = require('../../infrastructure/persistence/mongoose/medicationModel');
const DoctorModel = require('../../infrastructure/persistence/mongoose/doctorModel');
const mongoose = require('mongoose');

class ReportController {
  // Reporte 1: Historial de consultas por paciente
  patientHistory = async (req, res) => {
    try {
      const patientId = req.params.patientId;
      const history = await AppointmentModel.aggregate([
        { $match: { patient: new mongoose.Types.ObjectId(patientId) } },
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctor',
            foreignField: '_id',
            as: 'doctor'
          }
        },
        { $unwind: '$doctor' },
        {
          $lookup: {
            from: 'prescriptions',
            localField: 'prescriptionId',
            foreignField: '_id',
            as: 'prescription'
          }
        },
        { $unwind: '$prescription' },
        {
          $lookup: {
            from: 'medications',
            localField: 'prescription.medications.medicationId',
            foreignField: '_id',
            as: 'medicationsInfo'
          }
        },
        {
          $addFields: {
            medications: {
              $map: {
                input: '$prescription.medications',
                as: 'med',
                in: {
                  name: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$medicationsInfo',
                          as: 'medInfo',
                          cond: { $eq: ['$$medInfo._id', '$$med.medicationId'] }
                        }
                      },
                      0
                    ]
                  },
                  quantity: '$$med.quantity'
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            appointmentDate: '$date',
            appointmentStatus: '$status',
            doctorName: { $concat: ['$doctor.firstName', ' ', '$doctor.lastName'] },
            doctorSpecialty: '$doctor.specialty',
            prescriptionDate: '$prescription.date',
            prescriptionCreatedAt: '$prescription.createdAt',
            medications: {
              $map: {
                input: '$medications',
                as: 'm',
                in: {
                  name: '$$m.name.name',
                  quantity: '$$m.quantity'
                }
              }
            }
          }
        }
      ]);
      res.json(history);
    } catch (err) {
      res.status(500).json({ message: 'Error al generar el historial', error: err.message });
    }
  };

  // Reporte 2: Inventario de medicamentos
  medicationsInventory = async (req, res) => {
    try {
      const inventory = await MedicationModel.aggregate([
        {
          $lookup: {
            from: 'prescriptions',
            localField: '_id',
            foreignField: 'medications.medicationId',
            as: 'prescriptions'
          }
        },
        {
          $addFields: {
            usedInPrescriptions: { $size: '$prescriptions' }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            description: 1,
            quantity: 1,
            createdAt: 1,
            updatedAt: 1,
            usedInPrescriptions: 1
          }
        }
      ]);
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ message: 'Error al generar el inventario', error: err.message });
    }
  };
}

module.exports = ReportController;
