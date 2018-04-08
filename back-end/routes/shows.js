var express = require('express');
var router = express.Router();
let db = require('../db/queries');

/* GET shows listing. */
router.get('/all', db.getAllShows);
router.get('/schedule', db.getSchedule);
router.get('/:showID', db.getSingleShow);

module.exports = router;
