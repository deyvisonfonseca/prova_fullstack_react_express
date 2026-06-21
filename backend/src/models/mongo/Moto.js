const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
  modelo: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  cilindradas: { type: Number, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Moto', motoSchema);
