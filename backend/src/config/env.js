require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE || 'trabalho_api',
    username: process.env.MYSQL_USER || 'app_user',
    password: process.env.MYSQL_PASSWORD || 'app_password'
  },
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/trabalho_api_nosql',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
