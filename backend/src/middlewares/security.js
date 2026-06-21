const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const env = require('../config/env');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Muitas requisições. Tente novamente mais tarde.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Muitas tentativas de login. Tente novamente mais tarde.' }
});

function applySecurity(app) {
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin }));
  app.use(expressJsonLimit());
  app.use(mongoSanitize());
  app.use(generalLimiter);
}

function expressJsonLimit() {
  const express = require('express');
  return express.json({ limit: '10kb' });
}

module.exports = { applySecurity, loginLimiter };
