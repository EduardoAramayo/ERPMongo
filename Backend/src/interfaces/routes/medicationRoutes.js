const router = require('express').Router();
const MedicationController = require('../controllers/MedicationController');
const MedicationRepository = require('../../infrastructure/reporsitories/MedicationRepository');
const MedicationService = require('../../application/services/MedicationService');
const { protect } = require('../middleware/authMiddleware');

const repo = new MedicationRepository();
const service = new MedicationService(repo);
const controller = new MedicationController(service);

router.use(protect);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;