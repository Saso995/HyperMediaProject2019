var express = require('express');
var router = express.Router();
var queries = require('../other/queriesBook.js');

router.get('/', queries.getBooks);

router.get('/:id', queries.getBooksByID);

module.exports = router;
