const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserRepository = require('../../infrastructure/reporsitories/UserRepository');
const UserService = require('../../application/services/UserService');
const { protect } = require('../middleware/authMiddleware');

const repo = new UserRepository();
const service = new UserService(repo);
const controller = new UserController(service);

router.use(protect);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;