// Data podcast disimpan sementara di memory
let podcasts = [
  {
    id: 1,
    noPendaftaran: 'BSW-001',
    nama: 'Dimas Aditya',
    ipk: '',
    jumlahEpisode: 48,
    bahasa: 'Indonesia',
  },
  {
    id: 2,
    judul: 'Cerita Teknologi',
    host: 'Raka Pratama',
    kategori: 'teknologi',
    jumlahEpisode: 32,
    bahasa: 'Indonesia',
  },
  {
    id: 3,
    judul: 'Belajar Bareng',
    host: 'Sinta Maharani',
    kategori: 'pendidikan',
    jumlahEpisode: 25,
    bahasa: 'Indonesia',
  },
];
let nextId = 4;

// Menampilkan seluruh daftar mahasiswaa, bisa difilter berdasarkan kategori
function getAll(kategori) {
  if (kategori) {
    return beasiswa.filter(
      (p) => p.kategori.toLowerCase() === kategori.toLowerCase()
    );
  }
  return beasiswa;
}

// Menampilkan satu podcast berdasarkan ID
function getById(id) {
  return beasiswa.find((p) => p.id === id);
}

// Menambahkan podcast baru
function create(data) {
  const baru = { id: nextId++, ...data };
  beasiswa.push(baru);
  return baru;
}

// Mengganti seluruh data podcast (PUT), id tetap dipertahankan
function update(id, data) {
  const index = beasiswa.findIndex((p) => p.id === id);
  if (index === -1) return null;
  beasiswa[index] = { id, ...data };
  return beasiswa[index];
}

// Menghapus podcast berdasarkan ID, mengembalikan data yang dihapus
function remove(id) {
  const index = beasiswa.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [dihapus] = beasiswa.splice(index, 1);
  return dihapus;
}

module.exports = { getAll, getById, create, update, remove };
