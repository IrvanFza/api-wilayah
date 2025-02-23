const express = require('express');
const router = express.Router();
const data = require('../../data/json/region/kecamatan.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/:kode_kabkota', createFilteredRoute(data, 'kode_kabkota'));

module.exports = router;