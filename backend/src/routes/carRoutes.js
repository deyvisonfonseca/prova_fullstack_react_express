const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const controller = require('../controllers/carController');
const { authenticate } = require('../middlewares/auth');
const { validate, carSchema } = require('../middlewares/validation');

router.use(authenticate);
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(carSchema), asyncHandler(controller.create));
router.put('/:id', validate(carSchema), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.remove));

module.exports = router;
