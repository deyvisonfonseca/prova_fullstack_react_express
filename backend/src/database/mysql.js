const { Sequelize } = require('sequelize');
const env = require('../config/env');

const sequelize = new Sequelize(env.mysql.database, env.mysql.username, env.mysql.password, {
  host: env.mysql.host,
  port: env.mysql.port,
  dialect: 'mysql',
  logging: false,
  retry: {
    max: 10,
    backoffBase: 1000,
    backoffExponent: 1.5
  }
});

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectMySQL() {
  let lastError;

  for (let attempt = 1; attempt <= 10; attempt += 1) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      return;
    } catch (error) {
      lastError = error;
      if (attempt === 10) {
        throw error;
      }
      console.warn(
        `Tentativa ${attempt}/10 falhou ao conectar com o MySQL: ${error.message}. Repetindo...`
      );
      await sleep(3000);
    }
  }

  throw lastError;
}

module.exports = { sequelize, connectMySQL };
