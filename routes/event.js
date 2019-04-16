var express = require('express');
var router = express.Router();
var queries = require('../other/eventQueries.js');

router.get('/', queries.getEvents);

router.get('/:id', queries.getEventByID);

module.exports = router;
