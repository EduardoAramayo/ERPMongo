const router = require('express').Router();
const PatientController = require('../controllers/PatientController');
const PatientRepository = require('../../infrastructure/reporsitories/PatientRepository');
const PatientService = require('../../application/services/PatientService');
const { protect } = require('../middleware/authMiddleware');

const repo = new PatientRepository();
const service = new PatientService(repo);
const controller = new PatientController(service);

router.use(protect);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;