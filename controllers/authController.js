const User = require('../models/User'); // Kullanıcı modelini ayrıca oluşturacağız
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Email daha önce kayıtlı mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email zaten kullanılıyor.' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla kayıt oldu.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı var mı kontrol et
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Geçersiz email veya şifre.' });
    }

    // Şifre doğrulama
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz email veya şifre.' });
    }

    // JWT oluştur
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
