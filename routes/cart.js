var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send("Someone made a get request on cart");
});

module.exports = router;
