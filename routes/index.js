var express = require('express');
var router = express.Router();

var request = require('request');

var Startup = require('../modules/models');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

router.get('/startups', function(req, res, next) {
  Startup.find(function(err, results) {
    if(err) {
      res.send(500, err);
      console.log("error");
    }
    else {
      console.log(results);
      res.send(200, results);
    }
  });
});

module.exports = router;
