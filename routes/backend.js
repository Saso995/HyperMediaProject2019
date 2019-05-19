var express = require('express');
var router = express.Router();
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('./public/back-end/spec.yaml');

router.use('/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/',express.static(__dirname +'public/back-end'));

module.exports = router;
