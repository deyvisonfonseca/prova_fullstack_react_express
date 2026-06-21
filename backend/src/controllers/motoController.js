const Moto = require('../models/mongo/Moto');
const createCrudController = require('./crudFactory');
module.exports = createCrudController(Moto, 'Moto');
