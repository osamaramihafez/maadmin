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
app.get('/maadmin/api/login', function(req, res){
  //Handle login request
  var username = req.body.username;
  var password = req.body.password;
  var result = admin.login(username, password);
  res.set('Access-Control-Allow-Origin', '*');
  res.json(result);
})

function addTeam(teamName, division){
  //Helper function for adding a team to the database
  // returns  

}

function addPlayer(fn, ln, p, e){
  var sql = 'INSERT INTO player (firstName, lastName, phone, email) VALUES ($1, $2, $3, $4);';
  // client.query(sql, [fn, ln, p, e]).then(result => {
  //   console.log(result.rows);
  //   result.rows[0];
  //   console.log(correctPass)
  //   var login = {
  //     success: true
  //   }
  //   if (password === correctPass){  
  //     return login;
  //   }
  //   login.success = false
  //   return login
  // }).catch(e => {
  //   console.log("\n*Some sort of error*\n");
  //   console.log(e);
  //   return e;
  // })
}

function connectTeamPlayer(teamId, playerId, isCap){
  var sql = 'INSERT INTO team (teamName, division) VALUES ($1, $2);';
  // client.query(sql, [teamName, division]).then(result => {
  //   console.log(result.rows);
  //   var correctPass = result.rows[0].password;
  //   console.log(correctPass)
  //   var login = {
  //     success: true
  //   }
  //   if (password === correctPass){  
  //     return login;
  //   }
  //   login.success = false
  //   return login
  // }).catch(e => {
  //   console.log("\n*Some sort of error*\n");
  //   console.log(e);
  //   return e;
  // })
}


app.post('/maadmin/api/addTeam',function(req,res){
  var capFirst = req.body.firstName;
  var capLast = req.body.lastName;
  var phone = req.body.phone;
  var email = req.body.email;
  var teamName = req.body.teamName;
  var division = req.body.division;
  
  var resultTeam = addTeam(teamName, division)
  var resultPlayer = addPlayer(capFirst, capLast, phone, email)
  var resultTeamPlayer = connetTeamPlayer(resultTeam.id, resultPlayer.id, true)
  
  res.set('Access-Control-Allow-Origin', '*');
  res.json({...resultTeam, ...resultPlayer});
});

app.post('/maadmin/api/addPlayer',function(req,res){
  var capFirst = req.body.firstName;
  var capLast = req.body.lastName;
  var phone = req.body.phone;
  var email = req.body.email;
  res.json({status:"This ain't ready yet."});
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