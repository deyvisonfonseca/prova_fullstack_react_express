const Car = require('../models/mongo/Car');
const createCrudController = require('./crudFactory');
module.exports = createCrudController(Car, 'Carro');
