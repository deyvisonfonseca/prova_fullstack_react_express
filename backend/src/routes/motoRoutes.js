const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const controller = require('../controllers/motoController');
const { authenticate } = require('../middlewares/auth');
const { validate, motoSchema } = require('../middlewares/validation');

router.use(authenticate);
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(motoSchema), asyncHandler(controller.create));
router.put('/:id', validate(motoSchema), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.remove));

module.exports = router;
