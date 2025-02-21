const express = require('express');
const router = express.Router();
const data = require('../../data/json/kabupaten_kota.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/:kode_provinsi', createFilteredRoute(data, 'kode_provinsi'));

module.exports = router;