const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  suit: { type: String },
  number: { type: Number },
  image: { type: String },      // görsel URL
  meaning_up: { type: String }, // düz anlam
  meaning_rev: { type: String }, // ters anlam
  description: { type: String }, // genel açıklama
});

module.exports = mongoose.model('Card', cardSchema);
