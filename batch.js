var exec = require('child_process').exec;

var url_list = [
                'https://angel.co/university-of-california-los-angeles',
                'https://angel.co/ucla-anderson-school-of-management-1',
                'https://angel.co/ucla-school-of-law-1',
                'https://angel.co/ucla-law',
                'https://angel.co/ucla-extension',
                'https://angel.co/ucla-school-of-theater-film-and-television',
                'https://angel.co/ucla-2',
                'https://angel.co/university-of-california-extension-los-angeles'
              ];

for (var i = 0; i < url_list.length; ++i) {
  var cmd = "phantomjs getID.js " + i + " " + url_list[i];
  console.log(cmd);
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
  });
}
