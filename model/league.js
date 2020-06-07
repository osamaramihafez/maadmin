class League{

    constructor(name){
        //Get the league based on ID from the db
        this.name = name;
        this.divisions = {};
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

module.exports.League = League;