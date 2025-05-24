const router = require('express').Router();
const PrescriptionController = require('../controllers/PrescriptionController');
const PrescriptionRepository = require('../../infrastructure/reporsitories/PrescriptionRepository');
const PrescriptionService = require('../../application/services/PrescriptionService');
const { protect } = require('../middleware/authMiddleware');

const repo = new PrescriptionRepository();
const service = new PrescriptionService(repo);
const controller = new PrescriptionController(service);

router.use(protect);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;