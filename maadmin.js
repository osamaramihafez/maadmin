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

//I forgot why I created this object, will keep it for now iA:
let choices = {
  admin: new maadmin.Admin()
};

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
  choices.admin.login(username, password, result => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
})

app.post('/maadmin/api/logout', (req, res) => {
  choices.admin.logout();
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200);
  res.json({success: true});
})

app.get('/maadmin/api/leagueNames', (req, res) => {
  choices.leagues = choices.admin.getLeagueNames(choices.admin, leagueNames => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueNames)
  });
})

app.get('/maadmin/api/teamList/:league', (req, res) => {
  choices.admin.leagues[req.params.league].getTeamNames(choices.admin, teams => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(teams);
  });
})

app.post('/maadmin/api/createLeague', (req, res) => {
  choices.admin.addLeague(req.body.leaguename, req.body.numDivs, leagueName => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueName);
  });
})

app.post('/maadmin/api/addTeam', (req,res) => {
  var first = req.body.firstName;
  var last = req.body.lastName;
  var phone = req.body.phone;
  var email = req.body.email;
  var teamName = req.body.teamName;
  var division = req.body.division;
  var league = req.body.league;
  var age = req.body.age;
  //Add the player and team to the database (and connect them to the team)
  choices.admin.addTeam(first, last, phone, email, age, teamName, division, league);
  res.set('Access-Control-Allow-Origin', '*');
  // res.status(200); // Or maybe not
});

app.post('/maadmin/api/addDivision', (req, res) => {
  choices.league = choices.admin.leagues[req.body.leaguename];
  choices.league.addDivison(req.body.leaguename, req.body.division, leagueName => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueName);
  });
})