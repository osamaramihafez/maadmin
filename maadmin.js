// This is the node file, this is where are all of the http requests are handled
// and where the database is accessed
var port = 3001;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const maadmin = require('./model/model.js');
const Client = require('pg').Client;
const client = new Client({
  user: 'maadmin',
  password: 'VeryG00dPa$$word',
  host: 'localhost',
  port: 5432,
  database: 'maadmin'
})
client.connect()
.then(() => console.log('Connected to db successfully'))
.catch(e => console.log(e));

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

var league = new maadmin.League(2);
// console.log(league); 

app.get('/maadmin/api/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  // var username = 'maadmin';
  console.log(username);
  res.set('Access-Control-Allow-Origin', '*');
  var sql = 'SELECT password FROM admin WHERE username=$1;';
  client.query(sql, [username]).then(result => {
    console.log(result.rows);
    var correctPass = result.rows[0].password;
    console.log(correctPass)
    var login = {
      success: true
    }
    if (password === correctPass){  
      res.json(login);
      return;
    }
    login.success = false
    res.json(login)
  }).catch(e => {
    console.log("\n*Some sort of error*\n");
    console.log(e);
    res.json(e);
  })
})

app.post('/maadmin/api/addTeam',function(req,res){
    requests.push(req)
    var team = new maadmin.Team(req.body.teamName, req.body.division, req.body.captain);
    console.log(team)
    league.addTeam(team.div, team);
    console.log(league.getTeams());
    db.teams[req.body.teamName] = team;
    console.log(db);
    res.json(db);
});

app.post('/maadmin/api/addPlayer',function(req,res){
  requests.push(req)
  var team = new maadmin.Team(req.body.teamName, req.body.division, req.body.captain);
  console.log(db);
  res.json(db);
});

app.post('/maadmin/api/getLeague',function(req,res){
  requests.push(req)
  var team = new maadmin.Team(req.body.teamName, req.body.division, req.body.captain);
  console.log(db);
  res.json(db);
});

app.post('/maadmin/api/createLeague',function(req,res){
  requests.push(req)
  var team = new maadmin.League(2);
  console.log(db);
  res.json(db);
});