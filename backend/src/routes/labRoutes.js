const express = require('express');
const router = express.Router();
const calenderController = require('../controllers/labController.js');

router.get('/calender', calenderController.getAllReservations)

module.exports = router;