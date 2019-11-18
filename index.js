var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var tempState = require('./state');

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString: connectionString, ssl: false });
client.connect();

app.use(express.static('./app'));
app.get('/state', function (req, res) {
  res.json(tempState);
  client.query('SELECT * FROM streams LIMIT 1 order by created DESC',
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      res.json(results);
    });
});

app.post('/state', function (req, res) {
  var state = '';
  req.on('data', function (chunk) {
    state += chunk;
  });

  req.on('end', async function () {
    console.log(state);
    await client.query('INSERT INTO streams (created, state) values($1, $2)',
      [Date.now(), state]);
    res.send('{"message": "successfully updated"');
  });
});

app.listen(port, function () {
  console.log(`Express server listening ${port}`);
});
