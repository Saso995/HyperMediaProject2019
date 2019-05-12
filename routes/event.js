var express = require('express');
var router = express.Router();
var queries = require('../other/eventQueries.js');

router.get('/', queries.getEvents);

router.get('/:id', queries.getEventByID);

router.get('/book/:bookid', queries.getEventByBookID);

module.exports = router;
