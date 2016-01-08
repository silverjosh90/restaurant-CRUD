var express = require('express');
var router = express.Router();
var pg = require('pg');
var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'gTables' });
});

module.exports = router;
