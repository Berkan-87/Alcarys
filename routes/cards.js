const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const cardsData = require('../cards.json'); // JSON'dan kartları yükle

// Tüm kartları getir (GET /api/cards)
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Kartlar alınırken hata oluştu' });
  }
});

// 78 kartı veritabanına ekle (POST /api/cards/init)
router.post('/init', async (req, res) => {
  try {
    const existing = await Card.find();
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Kartlar zaten eklenmiş' });
    }

    await Card.insertMany(cardsData);
    res.status(201).json({ message: 'Kartlar başarıyla eklendi' });
  } catch (error) {
    res.status(500).json({ message: 'Kartlar eklenirken hata oluştu' });
  }
});

module.exports = router;
