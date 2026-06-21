const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        message: 'Erro de validação',
        details: error.details.map((detail) => detail.message)
      });
    }
    req.body = value;
    return next();
  };
}

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid('admin', 'user').default('user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required()
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6).max(100),
  role: Joi.string().valid('admin', 'user')
}).min(1);

const carSchema = Joi.object({
  modelo: Joi.string().min(2).max(80).required(),
  marca: Joi.string().min(2).max(80).required(),
  ano: Joi.number().integer().min(1900).max(2100).required(),
  cor: Joi.string().min(2).max(40).required(),
  preco: Joi.number().positive().required()
});

const motoSchema = Joi.object({
  modelo: Joi.string().min(2).max(80).required(),
  marca: Joi.string().min(2).max(80).required(),
  cilindradas: Joi.number().integer().positive().required(),
  ano: Joi.number().integer().min(1900).max(2100).required(),
  preco: Joi.number().positive().required()
});

const clothingBrandSchema = Joi.object({
  nome: Joi.string().min(2).max(80).required(),
  segmento: Joi.string().min(2).max(80).required(),
  paisOrigem: Joi.string().min(2).max(80).required(),
  anoFundacao: Joi.number().integer().min(1800).max(2100).required()
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  userUpdateSchema,
  carSchema,
  motoSchema,
  clothingBrandSchema
};
