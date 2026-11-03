const express = require('express');
const router = express.Router();
const beasiswaController = require('../controllers/seleksiMahasiswa');
const cekApiKey = require('../middlewares/cekApiKey');

// Baca data: terbuka
router.get('/', beasiswaController.getAll);
router.get('/:id', beasiswaController.getById);

// Ubah data: wajib API key
router.post('/', cekApiKey, beasiswaController.create);
router.put('/:id', cekApiKey, beasiswaController.update);
router.delete('/:id', cekApiKey, beasiswaController.remove);

module.exports = router;