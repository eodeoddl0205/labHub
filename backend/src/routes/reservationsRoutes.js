const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController.js');

router.post('', reservationsController.postReservations);

module.exports = router;