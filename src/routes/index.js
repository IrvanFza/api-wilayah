const express = require('express');
const router = express.Router();

const provinsiRoutes = require('./provinsi');
const kabupatenKotaRoutes = require('./kabupatenKota');
const kecamatanRoutes = require('./kecamatan');
const desaKelurahanRoutes = require('./desaKelurahan');

router.use('/api/provinsi', provinsiRoutes);
router.use('/api/kabupaten-kota', kabupatenKotaRoutes);
router.use('/api/kecamatan', kecamatanRoutes);
router.use('/api/desa-kelurahan', desaKelurahanRoutes);

module.exports = router;
