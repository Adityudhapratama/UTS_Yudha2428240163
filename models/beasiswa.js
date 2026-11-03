// Data podcast disimpan sementara di memory
let podcasts = [
  {
    id: 1,
    noPendaftaran: 'BSW-001',
    nama: 'Yudha',
    ipk: '3.70',
    status: 'Verifikasi',
    beasiswaId: 'BSW-24',
  },
  {
    id: 2,
    noPendaftaran: 'BSW-002',
    nama: 'akang',
    ipk: '4.00',
    status: 'Verifikasi',
    beasiswaId: 'BSW-67',
  },
  {
    id: 3,
    noPendaftaran: 'BSW-003',
    nama: 'ikbal',
    ipk: '4.00',
    status: 'Verifikasi',
    beasiswaId: 'BSW-53',
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

function getById(id) {
  return beasiswa.find((p) => p.id === id);
}

// Menambahkan podcast baru
function create(data) {
  const baru = { id: nextId++, ...data };
  beasiswa.push(baru);
  return baru;
}

function update(id, data) {
  const index = beasiswa.findIndex((p) => p.id === id);
  if (index === -1) return null;
  beasiswa[index] = { id, ...data };
  return beasiswa[index];
}

function remove(id) {
  const index = beasiswa.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const [dihapus] = beasiswa.splice(index, 1);
  return dihapus;
}

module.exports = { getAll, getById, create, update, remove };
