// This is the node file, this is where are all of the http requests are handled
// and where the database is accessed
var port = 3000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var models = require('models');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log('maadmin app listening on port '+port);
  });