// Implementation of a team
const Plyr = require('./player')

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

class Team{
    constructor(name, id, db){
        this.name = name;
        this.id = id;
        this.players = {};
        this.db = db;
    }

    addPlayer(body){
        var playerid;
        var sql = 'INSERT INTO player (firstName, lastName, phone, email, age) VALUES ($1, $2, $3, $4, $5) RETURNING playerId;';
        this.db.query(sql, [body.firstName, body.lastName, body.phone, body.email, body.age]).then(res => {
            playerid = res.rows[0].playerid;
            console.log("new player with ID: " + playerid);
            this.players[playerid] = new Plyr.Player(body.firstName, body.lastName, body.phone, body.email, body.age, this.db);
            this.playerToTeam(playerid, true);
            this.createPlayerStats(body.league, body.division, playerid);
        }).catch(e => {
            console.log("\n ERROR! Player could not be created!\n", e);
            return e;
        })
    }

    createPlayerStats(league, div, pid){
        //Creates a players default stats while indicating the league and division they belong to
        var sql="INSERT INTO playerStats (league, division, player) VALUES ($1, $2, $3) RETURNING *;"
        this.db.query(sql, [league, div, pid]).then(res => {
            if (res.rows[0] === null){
                console.log("Could not add Stats to player with ID: " + pid +" in " + league + " division " + div);
            }
            console.log("Created Stats for player with ID: " + pid +" in " + league + " division " + div);
        }).catch((err) => {
            console.log(league, div, pid)
            console.log("Couldn't create player stats")
            console.log(err)
        })
    }
    
    playerToTeam(player, captain){
        //Connects a player to a team
        var sql = 'INSERT INTO teamplayer (playerid, teamId, isCaptain) VALUES ($1, $2, $3);';
        this.db.query(sql, [player, this.id, captain]).then(res => {
            return;
        }).catch(e => {
            console.log("\n ERROR! Player cannot be added to team\n", e);
            return e;
        })
    }
}

module.exports.Team = Team;
