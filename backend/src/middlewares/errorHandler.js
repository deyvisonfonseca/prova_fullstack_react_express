const logger = require('../utils/logger');

function notFound(req, res) {
  return res.status(404).json({ message: 'Rota não encontrada' });
}

function errorHandler(err, req, res, next) {
  logger.error({ message: err.message, stack: err.stack });
  const status = err.status || 500;
  return res.status(status).json({
    message: status === 500 ? 'Erro interno do servidor' : err.message
  });
}

module.exports = { notFound, errorHandler };
