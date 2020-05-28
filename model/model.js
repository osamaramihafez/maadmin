
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

class Admin{
    constructor(){
        //Each administrator should have a name (id) and a set of leagues.
        //Note: we don't need to store the password here, the database keeps the password safe.
        this.name = ''
        this.leagues = {};
    }

    logout(){
        this.name = ''
        this.leagues = {}
    }

    getLeagueNames(admin, respond){
        var sql = 'SELECT leagueName FROM leagueAdmin WHERE admin=$1;';
        var name = this.name
        client.query(sql, [name]).then(result => {

            //If the rows are empty, then that means that this admin does not currently organize a league. 
            if (result.rows[0] == null){
                console.log("This admin does not currently organize a league.");
                respond({});
                return;
            }
            
            //We want to create a league object for each league that we fetched so that we can access them later.
            result.rows.forEach(sqleague => {
                this.leagues[sqleague.leaguename] = new League(sqleague.leaguename);
                console.log("We got a league called: " + sqleague.leaguename);
            })

            // We're returning a json object containing all of the league names
            respond({leagues: Object.keys(this.leagues)});
            return;
        }).catch(e => {
            console.log("\nLEAGUE FETCH ERROR!\n");
            console.log(e);
            return e;
        })
    }

    connectLeague(leagueName){
        //This function connects a league to an administrator.
        var sql = 'INSERT INTO leagueAdmin (leagueName, admin) VALUES ($1, $2) RETURNING *;';
        var admin = this.name
        console.log(admin)
        console.log("Connecting: " + leagueName);
        client.query(sql, [leagueName, admin]).then(result => {
            if (result.rows[0] == null){
                console.log("Did not connect "+ leagueName + " to" + admin);
                return;
            }
            console.log("Connected "+ leagueName + " to" + admin);
            return;
        }).catch(e => {
            console.log("\nLEAGUE CONNECTION ERROR!\n");
            console.log(e);
            return e;
        })
    }

    addLeague(leagueName, numDivs, respond){

        //First we will add a league to the database, then connect it to an admin using connectLeague
        var sql = 'INSERT INTO league (leaguename) VALUES ($1) RETURNING *;';
        console.log(leagueName);
        client.query(sql, [leagueName]).then(result => {

            //If we have null returned, what does that mean?
            if (result.rows[0] == null){
                console.log("Did not add " + leagueName + " to leagues");
                respond({success: false});
                return;
            }

            // Now that we've added the league, we first want to add some divisions to the league
            var league = new League(leagueName);
            league.addDivisions(parseInt(numDivs), () => {
                this.leagues[leagueName] = league;

                //We also want to connect the league to the admin
                this.connectLeague(leagueName);
                respond({success: true});
                return;
            })

        }).catch(e => {
            console.log("\nLEAGUE CREATION ERROR!\nTHIS LEAGUE LIKELY ALREADY EXISTS.\n");
            respond({
                succes: false,
                error: "ALREADY EXISTS"
            })
            console.log(e);
            return;
        })
    }

    login(username, password, respond){
        var sql = 'SELECT password FROM admin WHERE username=$1;';
        console.log(username, password)
        client.query(sql, [username]).then(result => {
            var login = {
            success: false
            }
            if (result.rows[0] == null){
                console.log("Username does not exist.");
                respond(login);
                return;
            }
            var correctPass = result.rows[0].password;
            if (password === correctPass){  
                login.success = true
                this.name = username;
                console.log("Password correct.");
                respond(login);
                return;
            }
            console.log("Password incorrect.");
            respond(login);
            return;
        }).catch(e => {
            console.log("\nLOGIN ERROR!\n");
            console.log(e);
            return e;
        })
    }
}

class Player{
    constructor(id, first, last, age, email, phone){
        this.playerId = id;
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.goals = 0;
        this.assists = 0;
        this.yellowCards = 0;
        this.redCards = 0;
        this.appearances = 0;
        this.email = email;
        this.phone= phone;
    }  

    updatePlayer(){

    }

}

class Team{
    constructor(name, div, captain, id){
        this.id = id;
        this.name = name;
        this.div = div;
        this.captain = captain;
        this.players = {}
    }

    checkPlayer(fn, ln, p, e){
        //Later on, I want to make this check more advanced. i.e. check if only the name matches, let the user know.
        var sql = 'Select firstName, lastName, phone, email, playerId from player where firstName=$1, lastName=$2, phone=$3, email=$4;';
        var exists = false;
        client.query(sql, [fn, ln, p, e]).then(result => {
            //If there does exist a row that matches the select statement
            // Then we should not add a new player.
            if(result.rows[0] != null){
                console.log("This player already exists with player ID: " + result.rows[0].playerID )
            } else {
                return true;
            }
            respond();
        }).catch(e => {
            console.log("\nLOGIN ERROR!\n");
            console.log(e);
            return e;
        })
    }

    addPlayer(fn, ln, p, e, captain, respond){
        var playerId;
        if(this.checkPlayer(fn, ln, p, e)){
            respond();
            return;
        }
        //Before we add a player, we first need to see if he already exists. call checkPlayer(fn, ln, p, e)
        var sql = 'INSERT INTO player (firstName, lastName, phone, email) VALUES ($1, $2, $3, $4) RETURNING playerId;';
        client.query(sql, [fn, ln, p, e]).then(result => {
            playerId = res.rows[0].playerId;
            this.players[playerId] = new Player(playerId, fn, ln, e,  p);
            this.playerToTeam();
            respond();
        }).catch(e => {
            console.log("\n ERROR! Player could not be created!\n");
            console.log(e);
            return e;
        })
        
    }

    playerToTeam(){
        //Connects a player to a team
        var sql = 'INSERT INTO teamplayer (playerId, teamId, isCaptain) VALUES ($1, $2, $3);';
        client.query(sql, [playerId, this.id, captain]).then(result => {
            console.log(res.rows[0])
            respond();
        }).catch(e => {
            console.log("\n ERROR! Player cannot be added to team\n");
            console.log(e);
            return e;
        })
    }
}

class League{
    constructor(name){
        //Get the league based on ID from the db
        this.name = name;
        this.teams = {};
        this.divisions = {};
    }

    async addDivisions(numDivs, connect){
        for(var div = 1; div<numDivs+1 ; div++){
            this.divisions[div] = new Division(div);
            // Current div capacity will always be 16, we can change this later.
            var sql = 'INSERT INTO division (divId, league, capacity) VALUES ($1, $2, 16);';
            await client.query(sql, [div, this.name]).then(res => {
                // console.log(res.rows[0])
                console.log("Division Created")
            }).catch(e => {
                console.log("\n ERROR! Division error\n");
                console.log(e);
                return e;
            })
        }
        connect();
    }

    getTeamNames(league, respond){
        const sql = 'SELECT teamname from team where league=$1'
        client.query(sql, [league]).then(result => {
            if (result.rows[0] == null){
                console.log("This league does not currently have any teams.");
                respond({teams:[]});
                return;
            }
            result.rows.forEach(teamName => {
                this.teams[teamName] = new Team(teamName);
                console.log("We got a league called: " + teamName);
            })
            // We're returning a json object containing all of the league names
            respond({teams: Object.keys(this.teams)});
            return;
        }).catch(e => {
            console.log("\nLEAGUE FETCH ERROR!\n");
            console.log(e);
            return e;
        })
        
    }
}

class Division{
    constructor(id){
        this.numTeams = 0;
        this.totalMatches = 0;
        this.id = id;
        this.teams = {};
        this.matches = [];
        this.teamMatches = {}
    }

    getTeams(){
        return this.teams;
    }

    getTeamMatches(team){
        return this.teamMatches[team];
    }

    getMatches(){
        return this.matches;
    }

    setTotalMatches(){
        this.totalMatches = (this.numTeams-1)*this.numTeams / 2;
    }

    addTeam(team){
        var match;
        this.numTeams++;
        this.setTotalMatches();
        this.teamMatches[team] = [];
        if (this.totalMatches > 0){
            for(var w = 0; w<this.numTeams - 1; w++){
                match = new Match(team, this.teams[w]);
                this.matches.push(match);
                this.teamMatches[team].push(match);
            }
            console.log(`It is ${this.matches.length == this.totalMatches} that the length of
                        the matches list is equivelant to the total number of matches.`);
        }
        this.teams[team.getName()] = team;
    }

    addTeamDB(){
        var sql = 'INSERT INTO team (teamName, division) VALUES ($1, $2);';
        client.query(sql, [teamName, division]).then(result => {
          return {success: true};
        }).catch(e => {
          console.log("\n*Some sort of error*\n");
          console.log(e);
          return e;
        })
    }
}

class Match{
    //A match is represented by two teams, a home score, an away score, a time, a date, a location (i.e. field).
    constructor(team1, team2){
        // this.id = id;
        this.played = false;
        this.home; // actual teams or a string?
        this.away;
        this.homeScore = 0;
        this.awayScore = 0;
        // this.time;
        // this.date;
        // this.location;
    }
    playMatch(score1, score2){
        this.played = true;
        this.homeScore = score1;
        this.awayScore = score2;
    }
}

// Make these parts later:

class Tournament{
    constructor(num_teams, teams){
        this.teams = teams;
        var r16 = {
                g1: null,
                g2: null,
                g3: null,
                g4: null,
                g5: null,
                g6: null,
                g7: null,
                g8: null
        };
        var qf = {
            g1: null,
            g2: null,
            g3: null,
            g4: null
        };
        var sf = {
            g1: null,
            g2: null
        };
        var final = null;
        this.tournament = [final, sf, qf, r16];
        this.size = Math.log(num_teams) / Math.log(2); // This number represents the index of the first round in the tournament.
    }
}

module.exports.League = League;
module.exports.Division = Division;
module.exports.Match = Match;
module.exports.Team = Team;
module.exports.Admin = Admin;

//GARBAGE CODE BELOW, STUFF I GOT RID OF (JUST FOR REFERENCE NOW)

// class Division{
//     constructor(numTeams, divisionLength, numDivs){
//         this.fixtures = [];
//         var i;
//         for (var d = 1; d<numDivs+1; d++){
//             this.fixtures.push(Division("D"+i, numTeams, divisionLength));
//         }
//     }
//     addTeam(team){
//         this.fixture.updateTeamDivision(team);
//     }
// }

// class Division{
//     constructor(id, numTeams){
//         this.totalMatches = numTeams-1*(numTeams - 2) / 2 //This number is just the sum of all the teams
//         this.MatchesPerRound = (numTeams / 2);
//         //For now, let's assume that we want each round to only have one match.
//         this.rounds = []; //index implies order of rounds i.e. round 1 is at index 1
//         this.id = id;
//         for (var i = 1; i<numMatches+1; i++){
//             this.rounds.push(MatchWeek("W" + i, numTeams/2));
//         }
//     }
//     addTeam(team){
//         for(var w; w<this.rounds.length; w++){
//             this.rounds[w].addTeams(team);
//         }
//     }
//     getRound(x){
//         return this.rounds[x];
//     }
// }
// class Round{
//     constructor(id, numMatches){
//         this.id = id;
//         this.matches = [];
//         this.matches = {};
//         for (var i = 1; i < numMatches+1; i++){
//             this.matches.push(Match("G" + i));
//             this.matches[]
//         }
//     }
//     addTeam(team){
//         for (var g = 0; g<this.matches.length; g++){
//             if (this.matches[g].inMatch(team)){ //First we have to check if the team is in a match.
//                 return false;
//             } else { g.addTeam(team); }
//         }
        
//     }
// }