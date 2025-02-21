const express = require('express');
const router = express.Router();
const data = require('../../data/provinsi.json');
const createFilteredRoute = require('../utils/createFilteredRoute');

router.get('/', createFilteredRoute(data));

module.exports = router;
