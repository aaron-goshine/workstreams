var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static('./app'));

app.get('/state', function (req, res) {
  res.send('{"message": "retrieved"}');
});

app.post('/state', function (req, res) {
  res.send('{"message": "saved"');
});

app.listen(port, function () {
  console.log(`Express server listening ${port}`);
});
