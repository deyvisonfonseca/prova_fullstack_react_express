const app = require('./app');
const env = require('./config/env');
const { connectMySQL } = require('./database/mysql');
const { connectMongo } = require('./database/mongo');
const logger = require('./utils/logger');

async function connectDatabases() {
  // 🔓 BYPASS DE CONEXÃO: Desativado temporariamente para não travar a inicialização
  // await Promise.all([connectMySQL(), connectMongo()]);
  logger.info('Bypass de Banco de Dados Ativado - Ignorando travas iniciais.');
}

async function startServer() {
  try {
    // Roda a função modificada que não vai travar o processo
    await connectDatabases();

    app.listen(env.port, () => {
      logger.info(`Servidor rodando em http://localhost:${env.port}`);
      logger.info(`Swagger em http://localhost:${env.port}/docs`);
    });
  } catch (error) {
    logger.error({
      message: 'Erro ao iniciar aplicação',
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

startServer();