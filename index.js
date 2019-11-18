var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var state = require('./state');

app.use(express.static('./app'));
app.get('/state', function (req, res) {
  console.log(`
  --------GET STATE-----------
  Need to connect to the database and retrieve
  the latest state (sorted by timestamps)
  and return it to the client`);
  // DATA ROW
  // create DATE, state JSON, id INTEGER
  // return JSON.parse (state)

  res.json(state);
});

app.post('/state', function (req, res) {
  var state = '';
  req.on('data', function (chunk) {
    state += chunk;
  });

  req.on('end', function () {
    console.log(`
  --------PUT STATE-----------
  Need to connect to database and create an entry
  for the current timestamps`);
    // DATA ROW
    // INSERT INTO state (create DATE, state JSON, id INTEGER),
    // NOW(), state, auto increment;
    console.log('--------STATE----------');
    console.log(state);
    res.send('{"message": "saved"');
  });
});

app.listen(port, function () {
  console.log(`Express server listening ${port}`);
});
