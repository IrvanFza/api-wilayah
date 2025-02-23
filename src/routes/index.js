const express = require('express');
const router = express.Router();

const provinsiRoute = require('./provinsi');
const kabupatenKotaRoute = require('./kabupatenKota');
const kecamatanRoute = require('./kecamatan');
const desaKelurahanRoute = require('./desaKelurahan');

router.use('/api/provinsi', provinsiRoute);
router.use('/api/kabupaten_kota', kabupatenKotaRoute);
router.use('/api/kecamatan', kecamatanRoute);
router.use('/api/desa_kelurahan', desaKelurahanRoute);

module.exports = router;
