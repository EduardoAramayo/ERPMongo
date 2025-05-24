const router = require('express').Router();
const ReportController = require('../controllers/ReportController');
const { protect } = require('../middleware/authMiddleware');

const ctrl = new ReportController();

router.use(protect);
router.get('/patient-history/:patientId', ctrl.patientHistory);
router.get('/medications-inventory', ctrl.medicationsInventory);

module.exports = router;
