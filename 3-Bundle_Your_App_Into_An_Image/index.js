var express = require('express');

var app = express();

var randomNumber = Math.floor(Math.random() * 1000000);

app.get('/', (req, res) => {
  res.send("This container's random number is: " + randomNumber + "\n");
});

app.post('/', (req, res) => {
  console.log('Yay, you posted something.\n');
  res.send('POST Successful\n');
});

console.log('listening on port 3000...\n');
app.listen(3000);