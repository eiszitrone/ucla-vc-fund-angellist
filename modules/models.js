var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/angellist-crawler');

var startupSchema = new mongoose.Schema(
  {
    "id": Number,
    "name": String,
    "created_at": String,
    "angellist_url" : String,
    "logo_url" : String
  }
);

var Startup = mongoose.model('Startup', startupSchema)

module.exports = Startup;
