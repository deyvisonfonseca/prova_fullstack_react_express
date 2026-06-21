const mongoose = require('mongoose');

const clothingBrandSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  segmento: { type: String, required: true, trim: true },
  paisOrigem: { type: String, required: true, trim: true },
  anoFundacao: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ClothingBrand', clothingBrandSchema);
