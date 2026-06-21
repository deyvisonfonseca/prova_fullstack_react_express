const router = require('express').Router();

router.get('/health', (req, res) => res.json({ status: 'ok', message: 'API funcionando' }));
router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/cars', require('./carRoutes'));
router.use('/motos', require('./motoRoutes'));
router.use('/clothing-brands', require('./clothingBrandRoutes'));

router.use('/items', require('./carRoutes'));

module.exports = router;
