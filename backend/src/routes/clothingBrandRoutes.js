const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const controller = require('../controllers/clothingBrandController');
const { authenticate } = require('../middlewares/auth');
const { validate, clothingBrandSchema } = require('../middlewares/validation');

router.use(authenticate);
router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));
router.post('/', validate(clothingBrandSchema), asyncHandler(controller.create));
router.put('/:id', validate(clothingBrandSchema), asyncHandler(controller.update));
router.delete('/:id', asyncHandler(controller.remove));

module.exports = router;
