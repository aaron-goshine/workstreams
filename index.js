var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString: connectionString });
client.connect();

app.use(express.static('./app'));
app.get('/state', function (req, res) {
  client.query('SELECT * FROM streams order by created DESC  LIMIT 1 ',
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ 'message': 'something wen wrong' });
        return;
      }
      if (results.rows.length > 0) {
        console.log('Retrieved data from database');
        res.json(results.rows[0].state);
        return;
      }
      res.status(500).json({ 'message': 'something went wrong' });
    });
});

app.post('/state', function (req, res) {
  var state = '';
  req.on('data', function (chunk) {
    state += chunk;
  });

  req.on('end', async function () {
    console.log(state);
    await client.query('INSERT INTO streams (state) values($1)',
      [state]);
    res.send('{"message": "successfully updated"');
  });
});

app.listen(port, function () {
  console.log(`Express server listening ${port}`);
});
