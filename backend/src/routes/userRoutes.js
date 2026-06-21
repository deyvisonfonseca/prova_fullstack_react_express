const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const controller = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validate, registerSchema, userUpdateSchema } = require('../middlewares/validation');


router.get('/', asyncHandler(controller.listUsers));
router.get('/:id', asyncHandler(controller.getUserById));
router.post('/', validate(registerSchema), asyncHandler(controller.createUser));
router.put('/:id', validate(userUpdateSchema), asyncHandler(controller.updateUser));
router.delete('/:id', asyncHandler(controller.deleteUser));

module.exports = router;
