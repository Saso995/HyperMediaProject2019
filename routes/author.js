var express = require('express');
var router = express.Router();
var queries = require('../other/authorQueries.js');

router.get('/', queries.getAuthors);

router.get('/:id', queries.getAuthorByID);

module.exports = router;
