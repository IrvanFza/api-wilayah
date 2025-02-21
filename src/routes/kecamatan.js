const express = require('express');
const router = express.Router();
const data = require('../../data/json/kecamatan.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/:kode_kabupaten_kota', createFilteredRoute(data, 'kode_kabupaten_kota'));

module.exports = router;