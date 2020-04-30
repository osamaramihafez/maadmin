// This is the node file, this is where are all of the http requests are handled
// and where the database is accessed
var port = 3001;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var leagueModel = require('./model/model.js');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log('maadmin app listening on port '+port);
});

//CRUD cheatsheet
// Create  
// Read 
// Update 
// Delete 

// All API requests can be seen below
// First attempt, we won't access a database, we'll treat a list as our database.

var db = {
  teams: {},
  players: {}
};
var requests = []

var league = new leagueModel.League(2);
// console.log(league); 

app.post('/maadmin/api/addTeam',function(req,res){
    requests.push(req)
    var team = new leagueModel.Team(req.body.teamName, req.body.division, req.body.captain);
    console.log(team)
    league.addTeam(team.div, team);
    console.log(league.getTeams());
    db.teams[req.body.teamName] = team;
    console.log(db);
    res.json(db);
});

app.post('/maadmin/api/addPlayer',function(req,res){
  requests.push(req)
  var team = new leagueModel.Team(req.body.teamName, req.body.division, req.body.captain);
  console.log(db);
  res.json(db);
});