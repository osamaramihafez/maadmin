
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

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
   }

module.exports.createAccount = function createAdmin(username, password, respond){
    var sql = "INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING *";
    client.query(sql, [username, password]).then(result => {
        //If the rows are empty, then that means that this admin does not currently organize a league. 
        if (result.rows[0] == null){
            console.log("This admin was not created.");
            if (isFunction(respond)) respond({success: false});
            return;
        }
        if (isFunction(respond)) respond({success: true});
        return;
    }).catch(e => {
        console.log("\nADMIN CREATION ERROR!\n");
        console.log(e);
        if (isFunction(respond)) respond({success: false});
        return e;
    })
}

class Admin{
    constructor(){
        //Each administrator should have a name (id) and a set of leagues.
        //Note: we don't need to store the password here, the database keeps the password safe.
        this.name = '';
        this.leagues = {};
    }

    logout(){
        this.name = ''
        this.leagues = {}
    }

    async addTeam(first, last, phone, email, age, teamName, division, league){
        await this.getLeagueNames(() => {
            console.log("League Fetch Complete.")
        });
        this.leagues[league].addTeam(first, last, phone, email, age, teamName, division, league);
    }

    getLeagueNames(respond){
        var sql = 'SELECT leagueName FROM leagueAdmin WHERE admin=$1;';
        var name = this.name
        client.query(sql, [name]).then(result => {

            //If the rows are empty, then that means that this admin does not currently organize a league. 
            if (result.rows[0] == null){
                console.log("The admin \""+ name +"\" does not currently organize a league.");
                if (isFunction(respond)) respond({});
                return;
            }
            //We want to create a league object for each league that we fetched so that we can access them later.
            result.rows.forEach(sqleague => {
                if (!this.leagues[sqleague.leaguename]){
                    this.leagues[sqleague.leaguename] = new League(sqleague.leaguename);
                    console.log("We got a league called: " + sqleague.leaguename);
                }
            })

            // We're returning a json object containing all of the league names
            if (isFunction(respond)) respond({leagues: Object.keys(this.leagues)});
            return this.leagues;
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
        console.log("Connecting " + leagueName + " to " + admin);
        client.query(sql, [leagueName, admin]).then(result => {
            if (result.rows[0] == null){
                console.log("Did not connect "+ leagueName + " to" + admin);
                return;
            }
            console.log("Connected "+ leagueName + " to " + admin);
            return;
        }).catch(e => {
            console.log("\nLEAGUE CONNECTION ERROR!\n");
            console.log(e);
            return e;
        })
    }

    async addLeague(leagueName, numDivs, respond){

        //First we will add a league to the database, then connect it to an admin using connectLeague
        var sql = 'INSERT INTO league (leaguename) VALUES ($1) RETURNING *;';
        console.log(leagueName);
        await client.query(sql, [leagueName]).then(result => {

            //If we have null returned, what does that mean?
            if (result.rows[0] == null){
                console.log("Did not add " + leagueName + " to leagues");
                if (isFunction(respond)) respond({success: false});
                return;
            }

            // Now that we've added the league, we first want to add some divisions to the league
            var league = new League(leagueName);
            league.addDivisions(parseInt(numDivs), () => {
                this.leagues[leagueName] = league;

                //We also want to connect the league to the admin
                this.connectLeague(leagueName);
                if (isFunction(respond)) respond({success: true});
                return;
            })
        }).catch(e => {
            console.log("\nLEAGUE CREATION ERROR!\nTHIS LEAGUE LIKELY ALREADY EXISTS.\n");
            if (isFunction(respond)) respond({
                succes: false,
                error: "ALREADY EXISTS"
            })
            console.log(e);
            return;
        })
    }

    login(username, password, respond){
        var sql = 'SELECT password FROM admin WHERE username=$1;';
        client.query(sql, [username]).then(result => {
            var login = {
            success: false
            }
            if (result.rows[0] == null){
                console.log("Username does not exist.");
                if (isFunction(respond)) respond(login);
                return;
            }
            var correctPass = result.rows[0].password;
            if (password === correctPass){  
                login.success = true
                this.name = username;
                console.log("Password correct.");
                if (isFunction(respond)) respond(login);
                return;
            }
            console.log("Password incorrect.");
            if (isFunction(respond)) respond(login);
            return;
        }).catch(e => {
            console.log("\nLOGIN ERROR!\n");
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
        this.players = {};
        this.divisions = {};
    }

    async addTeam(first, last, phone, email, age, teamName, division, league){
        await this.getDivisions();
        this.divisions[division].addTeam(first, last, phone, email, age, teamName, division, league);
    }

    async addDivisions(numDivs, connect){
        for(var div = 1; div<numDivs+1 ; div++){
            // Current div capacity will always be 16, we can change this later.
            var sql = 'INSERT INTO division (divId, league, capacity) VALUES ($1, $2, 16);';
            await client.query(sql, [div, this.name]).then(res => {
                console.log("Division " + div + " Created");
                this.divisions[toString(div)] = new Division(div);
            }).catch(e => {
                console.log("\nDIVISION CREATION ERROR!\n");
                console.log(e);
                return e;
            })
        }
        connect();
    }

    async getDivisions(){
        // Current div capacity will always be 16, we can change this later.
        var sql = 'SELECT divId from division where league=$1;';
        await client.query(sql, [this.name]).then(res => {
            var divBack = this.divisions;
            res.rows.forEach((division) => {
                if (!this.divisions[division.divid]){
                    this.divisions[division.divid] = new Division(division.divid);
                    console.log("We got a division called: " + division.divid);
                }
            })
        }).catch(e => {
            console.log("\nDIVISION FETCH ERROR!\n");
            console.log(e);
            return e;
        })
    }

    getPlayerNames(respond){
        const sql = 'SELECT * from player where league=$1'
        client.query(sql, [this.name]).then(result => {
            if (result.rows[0] == null){
                console.log("This league does not currently have any players.");
                return;
            }
            var back = this.players
            result.rows.forEach(player => {
                if (!this.players[player.name]){
                    this.players[player.name] = new player(player.name);
                    console.log("We got a player called: " + player.name);
                } else {
                    this.players[player.name] = back[player.name];
                    console.log("We got a player called: " + player.name);
                }
            })
            // We're returning a json object containing all of the league names
            if (isFunction(respond)) respond({players: Object.keys(this.players)});
            return;
        }).catch(e => {
            console.log("\nplayer  FETCH ERROR!\n");
            console.log(e);
            return e;
        })
    }

    getTeamNames(respond){
        const sql = 'SELECT * from team where league=$1'
        client.query(sql, [this.name]).then(result => {
            if (result.rows[0] == null){
                console.log("This league does not currently have any teams.");
                return;
            }
            var divBack = this.teams
            result.rows.forEach(team => {
                if (!this.teams[team.name]){
                    this.teams[team.name] = new Team(team.name);
                    console.log("We got a Team called: " + team.name);
                } else {
                    this.teams[team.name] = divBack[team.name];
                    console.log("We got a Team called: " + team.name);
                }
            })
            // We're returning a json object containing all of the league names
            if (isFunction(respond)) respond({teams: Object.keys(this.teams)});
            return;
        }).catch(e => {
            console.log("\nTeam  FETCH ERROR!\n");
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
    }

    addTeam(first, last, phone, email, age, name, division, league){
        var sql = 'INSERT INTO team (name, division, league) VALUES ($1, $2, $3) RETURNING *;';
        client.query(sql, [name, division, league]).then(result => {
            var id = result.rows[0].teamid
            var team = new Team(id, name);
            team.addPlayer(first, last, phone, email, age, league, division, true);
            this.teams[name] = team;
            return {success: true};
        }).catch(e => {
          console.log("\n*Some sort of error*\n");
          console.log(e);
          return e;
        })
    }

    getTeamNames(respond){
        const sql = 'SELECT * from team where division=$1'
        client.query(sql, [this.id]).then(result => {
            if (result.rows[0] == null){
                console.log("This league does not currently have any teams.");
                respond({teams:[]});
                return;
            }
            result.rows.forEach(team => {
                if (!this.teams[team.name]){
                    this.teams[team.name] = new Team(team.id, team.name);
                    console.log("We got a Team called: " + team.name);
                }
            })
            // We're returning a json object containing all of the league names
            if (isFunction(respond)) respond({teams: Object.keys(this.teams)});
            return;
        }).catch(e => {
            console.log("\nLEAGUE FETCH ERROR!\n");
            console.log(e);
            return e;
        })
        
    }

}

class Team{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.players = {}
    }

    addPlayer(first, last, phone, email, league, div, age){
        var playerid;
        var sql = 'INSERT INTO player (firstName, lastName, phone, email, age) VALUES ($1, $2, $3, $4, $5) RETURNING playerId;';
        client.query(sql, [first, last, phone, email, age]).then(res => {
            playerid = res.rows[0].playerid;
            console.log("new player with ID: " + playerid);
            this.players[playerid] = new Player(first, last, age, email, phone);
            this.playerToTeam(playerid, true);
            this.createPlayerStats(league, div, playerid);
        }).catch(e => {
            console.log("\n ERROR! Player could not be created!\n");
            console.log(e);
            return e;
        })
    }

    createPlayerStats(league, div, pid){
        var sql="INSERT INTO playerStats (league, division, player) VALUES ($1, $2, $3) RETURNING *;"
        client.query(sql, [league, div, pid]).then(res => {
            if (res.rows[0] === null){
                console.log("Could not add Stats to player with ID: " + pid +" in " + league + " division " + div);
            }
            console.log("Created Stats for player with ID: " + pid +" in " + league + " division " + div);
        }).catch((err) => {
            console.log("Couldn't create player stats")
            console.log(err)
        })
    }
    
    playerToTeam(player, captain){
        //Connects a player to a team
        var sql = 'INSERT INTO teamplayer (playerid, teamId, isCaptain) VALUES ($1, $2, $3);';
        client.query(sql, [player, this.id, captain]).then(res => {
            return;
        }).catch(e => {
            console.log("\n ERROR! Player cannot be added to team\n");
            console.log(e);
            return e;
        })
    }
}

class Player{
    constructor(first, last, age, email, phone){
        this.playerid;
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.email = email;
        this.phone= phone;
        this.goals = 0;
        this.assists = 0;
        this.yellowCards = 0;
        this.redCards = 0;
        this.appearances = 0;
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
module.exports.Player = Player;
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