const express = require('express');
const app = express();

const authRoutes = require('./routes/auth'); // Bu satır da burada olmalı

app.use(express.json()); // JSON gövde için gerekli
app.use('/api/auth', authRoutes); // Route kullanımı

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
