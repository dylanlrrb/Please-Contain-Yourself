var express = require('express');

var app = express();

var randomNumber = Math.floor(Math.random() * 1000000);

app.get('/', (req, res) => {
  res.send("Hello! This server's random number is: " + randomNumber + "\n");
});

console.log('listening on port 3000...\n');
app.listen(3000);