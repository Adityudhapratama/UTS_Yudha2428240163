const beasiswaModel = require('../models/beasiswa');
const { errorHttp } = require('../middlewares/errorHandler');

// Memeriksa apakah nilai kosong (undefined, null, atau string kosong)
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim() === '');

// Validasi body untuk POST dan PUT.
// Mengembalikan pesan error jika tidak valid, atau null jika valid.
function validasiPodcast({ judul, host, kategori, jumlahEpisode }) {
  if (isEmpty(judul) || isEmpty(host) || isEmpty(kategori)) {
    return 'Field judul, host, dan kategori wajib diisi';
  }

  if (
    jumlahEpisode !== undefined &&
    (typeof jumlahEpisode !== 'number' || jumlahEpisode < 0)
  ) {
    return 'jumlahSeleksi harus berupa angka yang valid';
  }

  return null;
}

function susunDataSeleksi({ judul, host, kategori, jumlahEpisode, bahasa }) {
  const data = {
    judul: judul.trim(),
    host: host.trim(),
    kategori: kategori.trim(),
  };

  if (jumlahEpisode !== undefined) data.jumlahEpisode = jumlahEpisode;
  if (bahasa !== undefined) data.bahasa = bahasa;

  return data;
}


exports.getAll = (req, res) => {
  const { kategori } = req.query;
  res.status(200).json(beasiswaModel.getAll(kategori));
};


exports.getById = (req, res, next) => {
  const id = Number(req.params.id);
  const podcast = beasiswaModel.getById(id);

  if (!podcast) return next(errorHttp(404, 'Data beasiswa tidak ditemukan'));

  res.status(200).json(podcast);
};


exports.create = (req, res, next) => {
  const body = req.body || {};

  const pesanError = validasiPodcast(body);
  if (pesanError) return next(errorHttp(400, pesanError));

  const beasiswaBaru = beasiswaModel.create(susunDataPodcast(body));

  res.status(201).json({
    status: 'success',
    message: 'beasiswa berhasil ditambahkan',
    data: beasiswaBaru,
  });
};


exports.update = (req, res, next) => {
  const id = Number(req.params.id);
  const body = req.body || {};

  if (!beasiswaModel.getById(id)) {
    return next(errorHttp(404, 'Data beasiswa tidak ditemukan'));
  }

  const pesanError = validasiPodcast(body);
  if (pesanError) return next(errorHttp(400, pesanError));

  const beasiswaDiubah = beasiswaModel.update(id, susunDataPodcast(body));

  res.status(200).json({
    status: 'success',
    message: 'beasiswa berhasil diperbarui',
    data: beasiswaDiubah,
  });
};


exports.remove = (req, res, next) => {
  const id = Number(req.params.id);
  const beasiswaDihapus = beasiswaModel.remove(id);

  if (!beasiswaDihapus) {
    return next(errorHttp(404, 'Data beasiswa tidak ditemukan'));
  }

  res.status(200).json({
    status: 'success',
    message: 'daftar beasiswa berhasil dihapus',
    data: beasiswaDihapus,
  });
};