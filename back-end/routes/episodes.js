var express = require('express');
var router = express.Router();
let db = require('../db/queries');

/* GET eps listing. */
router.get('/all', db.getAllEpisodes);

module.exports = router;
