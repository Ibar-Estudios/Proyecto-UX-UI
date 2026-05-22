const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MIDDLEWARES PRIMERO
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ MongoDB:', err));

// Test
app.get('/', (req, res) => res.json({ message: 'API OK' }));

// DEBUG REQUIRE
try {
  const routes = require('./routes/uxSections');
  console.log('✅ ROUTES CARGADAS:', typeof routes);
} catch (e) {
  console.error('❌ ROUTES ERROR:', e.message);
}

// RUTAS - DESPUÉS middlewares
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use('/api/ux-sections', require('./routes/uxSections'));

// // 404 & Error handlers ÚLTIMOS
// app.use('*', (req, res) => res.status(404).json({ error: 'No encontrada' }));
// app.use((err, req, res) => {
//   console.error(err);
//   res.status(500).json({ error: 'Server error' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));