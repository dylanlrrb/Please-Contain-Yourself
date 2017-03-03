var mongoose = require('mongoose');

var entrySchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('entry', entrySchema);
