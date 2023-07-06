var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var util = require('util')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/monitor', function(req, res, next) {
  console.log(util.inspect(req.body, false, null));
  res.send('ack');
});


server.listen(9002, function() {
  console.log('App listening on port 9002');
});