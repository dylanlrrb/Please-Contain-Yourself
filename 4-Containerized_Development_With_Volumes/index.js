var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {

// Change the 'color' variable to a different color!
  var color = 'red';

  res.render('index', {color: color});
});

console.log('listening on port 8080...\n');
app.listen(8080);