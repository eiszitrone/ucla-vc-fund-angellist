var express = require('express');
var router = express.Router();

var request = require('request');

var Startup = require('../modules/models');
var s1 = require('../scrapeS1Filing');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

// get angelist result
router.get('/angellist', function(req, res, next) {
  console.log('in angel');
  Startup.find(function(err, results) {
    if(err) {
      res.send(500, err);
      console.log("error");
    }
    else {
      res.send(200, results);
    }
  });
});

// get s1 filing search result
router.get('/s1', function(req, res, next) {
  console.log(req.query.searchDate);
  var date = req.query.searchDate;
  var format = /\d{2}\/\d{4}/;
  if (!format.test(date)) {
    res.send(200, []);
  }
  else {
    var url = makeURL(date);
    // console.log(test_url);
    s1.scrapeS1(url, function(results) {
      res.send(200, results);
    });
  }
});

function makeURL(date) {
  var month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var month = parseInt(date.substring(0, 2));
  var year = parseInt(date.substring(3));
  var days = month_days[month - 1];
  if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) days += 1;

  var fromDate = date.substring(0, 2) + "/01/" + date.substring(3);
  var toDate = date.substring(0, 2) + "/" + days + "/" + date.substring(3);
  var url = "https://searchwww.sec.gov/EDGARFSClient/jsp/EDGAR_MainAccess.jsp?search_text=ucla&sort=Date&formType=FormS1&isAdv=true&stemming=true&numResults=100&fromDate=" + fromDate + "&toDate=" + toDate + "&numResults=100";
  return url;
}

module.exports = router;
