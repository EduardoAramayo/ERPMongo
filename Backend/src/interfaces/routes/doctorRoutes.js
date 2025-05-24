const router = require('express').Router();
const DoctorController = require('../controllers/DoctorController');
const DoctorRepository = require('../../infrastructure/reporsitories/DoctorRepository');
const DoctorService = require('../../application/services/DoctorService');
const { protect } = require('../middleware/authMiddleware');

const repo = new DoctorRepository();
const service = new DoctorService(repo);
const controller = new DoctorController(service);

router.use(protect);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
