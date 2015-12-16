var phantom = require('phantom');

function scraper(url, callback) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.open(url, function (status) {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function() {
          // setTimeout(function() {
            page.evaluate(
              // this function should not return a dom object cause it's going to be very time consuming
              function() {
                var rows = $('.infoBorder').parent().children('tr:nth-of-type(4n+2)');
                var results = [];
                for(var i = 0; i < rows.length; ++i) {
                  var s1_url = $(rows[i]).find('a').attr('href').match(/\'(.*?)\'/g)[0];
                  s1_url = s1_url.substring(1, s1_url.length - 1);
                  results.push({
                    date:$(rows[i]).find("i.blue").html(),
                    name:$(rows[i]).find('a').html().substr(8).trim(),
                    url: s1_url
                  });
                }
                return results;
              },
              function(results) {
                console.log(results);
                callback(results);
                ph.exit();
              }
            );
          // },
          // 1000);
        });

      });
    });
  });
}

module.exports.scrapeS1 = scraper;
