const express = require('express');
const router = express.Router();
const data = require('../../data/json/provinsi.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/', createFilteredRoute(data));

module.exports = router;
