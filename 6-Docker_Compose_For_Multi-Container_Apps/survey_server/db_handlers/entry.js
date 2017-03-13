var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  name: String,
  color: String
});

module.exports = mongoose.model('entry', entrySchema);
