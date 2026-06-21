const router = require('express').Router();
const asyncHandler = require('../utils/asyncHandler');
const { register, login } = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../middlewares/validation');
const { loginLimiter } = require('../middlewares/security');

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', loginLimiter, validate(loginSchema), asyncHandler(login));

module.exports = router;
