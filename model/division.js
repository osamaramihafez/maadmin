// Implementation of a division
const team =require('./team')

class Division{
    constructor(id, db){
        this.db = db;
        this.numTeams = 0;
        this.totalMatches = 0;
        this.id = id;
        this.teams = {};
    }

    getTeam(team){
        return this.teams[team];
    }

    addTeam(body){
        //Add a team to the database.
        var sql = 'INSERT INTO team (name, division, league) VALUES ($1, $2, $3) RETURNING *;';
        this.db.query(sql, [body.firstName, body.lastName, body.phone, body.email, body.teamName, body.division, body.league, body.age]).then(result => {
            var id = result.rows[0].teamid
            var team = new Team(id, name);
            team.addPlayer(first, last, phone, email, age, league, division, true);
            this.teams[name] = team;
            return {success: true};
        }).catch(e => {
          console.log("\n*Some sort of error*\n", e);
          return e;
        })
    }

    getTeamNames(respond){
        const sql = 'SELECT * from team where division=$1'
        this.db.query(sql, [this.id]).then(result => {
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
            console.log("\nLEAGUE FETCH ERROR!\n", e);
            return e;
        })
    }

    addMatches(){
        var tname = Object.keys(this.teams);
        var team; var match;
        for (var t; t<tname.length; t++){
            team = this.teams[t];
            match = team.addMatch(); //addMatch should return a match
            (match)
        }
    }
}

module.exports.Division = Division;
