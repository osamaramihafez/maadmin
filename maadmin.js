// This is the node file, this is where are all of the http requests are handled
// and where the database is accessed
var port = 3001;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const maadmin = require('./model/model.js');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log('maadmin app listening on port ' + port);
});

//The current logged in administrator... this wouldn't work if we had multiple users:

//All API requests can be seen below:
app.post('/maadmin/api/login', (req, res) => {
  //Handle login request
  var username = req.body.username;
  var password = req.body.password;
  maadmin.login(username, password, result => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
})

app.post('/maadmin/api/createAccount', (req, res) => {
  //Handle login request
  var username = req.body.username;
  var password = req.body.password;
  maadmin.createAccount(username, password, result => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
})

app.post('/maadmin/api/logout', (req, res) => {
  maadmin.logout(req.body.username);
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200);
  res.json({success: true});
})

app.get('/maadmin/api/:user/leagueNames', (req, res) => {
  var user = maadmin.users[req.params.user];

  user.getLeagueNames(leagueNames => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueNames)
  });
})

app.get('/maadmin/api/:user/getDivisions/:league', (req, res) => {
  var user = maadmin.users[req.params.user];
  console.log(req.params.user);
  
  user.getLeague(req.params.league).getDivisions(teams => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
  });
})

app.get('/maadmin/api/:user/teamList/:league', (req, res) => {
  var user = maadmin.users[req.params.user];
  console.log(req.params.user);
  
  user.getLeague(req.params.league).getTeamNames(teams => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(teams);
  });
})

app.get('/maadmin/api/:user/playerList/:league', (req, res) => {
  var user = maadmin.users[req.params.user];

  user.getLeague(req.params.league).getPlayerNames(teams => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(teams);
  });
})

app.post('/maadmin/api/:user/createLeague', (req, res) => {
  //Create a league, body contains leaguename and numdivs (should also include capacity?)
  var user = maadmin.users[req.params.user];

  user.addLeague(req.body, leagueName => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueName);
  });
})

app.post('/maadmin/api/:user/addTeam', (req,res) => {
  var user = maadmin.users[req.params.user];
  //Add the player and team to the database (and connect them to the team)
  user.getLeague(req.body.league).getDivision(req.body.division).addTeam(req.body);
  res.set('Access-Control-Allow-Origin', '*');
  // res.status(200); // Or maybe not
});

app.post('/maadmin/api/:user/addDivision', (req, res) => {
  var league = admin.leagues[req.body.leaguename];
  var user = maadmin.users[req.params.user];

  user.getLeague(league).addDivison(req.body,  leagueName => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200);
    res.json(leagueName);
  });
})