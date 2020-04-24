var port = 3000;

var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log('Example app listening on port '+port);
  });