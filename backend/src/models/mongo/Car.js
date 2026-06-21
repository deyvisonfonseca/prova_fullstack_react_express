const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  modelo: { type: String, required: true, trim: true },
  marca: { type: String, required: true, trim: true },
  ano: { type: Number, required: true },
  cor: { type: String, required: true, trim: true },
  preco: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
