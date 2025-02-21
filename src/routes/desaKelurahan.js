const express = require('express');
const router = express.Router();
const data = require('../../data/json/desa_kelurahan.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/:kode_kecamatan', createFilteredRoute(data, 'kode_kecamatan'));

module.exports = router;