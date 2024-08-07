const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController.js');

router.get('', calendarController.getCalendar);
router.put('', calendarController.putCalendar);

module.exports = router;