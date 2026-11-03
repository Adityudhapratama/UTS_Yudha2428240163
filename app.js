require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const beasiswaRoutes = require('./routes/podcastRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.json({
    nama: 'Adit Yudha Pratama',
    npm: '2428240163',
    topik: 38,
    resource: '/Seleksi Beasiswa',
    endpoints: {
      getAll: 'GET /Seleksi Beasiswas',
      getById: 'GET /Seleksi Beasiswa/:id',
      create: 'POST /Seleksi Beasiswa',
      update: 'PUT /Seleksi Beasiswa/:id',
      delete: 'DELETE /Seleksi Beasiswa/:id',
      filter: 'GET /pendaftar?status=lolos',
    },
  });
});

// ---------- Route per modul ----------
app.use('/Seleksi Beasiswa', beasiswaRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

// Menjalankan server hanya saat bukan production
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;