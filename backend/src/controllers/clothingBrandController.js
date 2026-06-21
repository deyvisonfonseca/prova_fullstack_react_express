const ClothingBrand = require('../models/mongo/ClothingBrand');
const createCrudController = require('./crudFactory');
module.exports = createCrudController(ClothingBrand, 'Marca de roupa');
