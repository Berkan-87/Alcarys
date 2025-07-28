require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Register ve Login fonksiyonlarını içeren controller'ını import et
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

// Auth rotalarını ekle
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
console.log('Loaded PORT:', PORT);

// Test route (isteğe bağlı, sunucunun çalıştığını kontrol için)
app.get('/api/auth/test', (req, res) => {
  res.send('API çalışıyor');
});

// MongoDB bağlantısı ve server başlatma
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });
