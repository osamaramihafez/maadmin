// This is the node file, this is where are all of the http requests are handled
// and where the database is accessed
var port = 3001;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const maadmin = require('./model/model.js');

// client.connect()
// .then(() => console.log('Connected to db successfully'))
// .catch(e => console.log(e));

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log('maadmin app listening on port '+port);
});

let admin = new maadmin.Admin();

//CRUD cheatsheet:
// Create  POST
// Read    GET
// Update  PUT
// Delete  DELETE

//All API requests can be seen below:
app.post('/maadmin/api/login', (req, res) => {
  //Handle login request
  var username = req.body.username;
  var password = req.body.password;
  admin.login(username, password, result => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
})

app.get('/maadmin/api/leagueNames', (req, res) => {
  admin.getLeagueNames(admin, leagueNames => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueNames);
  });
})

app.post('/maadmin/api/addTeam', (req,res) => {
  var capFirst = req.body.firstName;
  var capLast = req.body.lastName;
  var phone = req.body.phone;
  var email = req.body.email;
  var teamName = req.body.teamName;
  var division = req.body.division;
  //Add the player and team to the database (and connect them)
  res.set('Access-Control-Allow-Origin', '*');
  // res.status(200); // Or maybe not
});