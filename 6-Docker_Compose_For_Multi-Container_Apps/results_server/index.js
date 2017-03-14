var express = require('express');
var mongoose = require('mongoose');
var entry = require('./db_handlers/entry.js');


var app = express();

var mongoUrl = 'mongodb://database/docker_test';

var connectWithRetry = function() {
  return mongoose.connect(mongoUrl, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  entry.find({}, function(err, entries) {
    if (err) {
      res.render('error');
    }
    console.log(entries);
    res.render('display', {data: entries});
  });
  
});

console.log('listening on port 3000...\n');
app.listen(3000);