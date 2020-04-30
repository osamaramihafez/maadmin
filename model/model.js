

class Team{
    constructor(name, div, captain){
        this.name = name;
        this.div = div;
        this.captain = captain;
    }
    getName(){
        return this.name;
    }
    getCaptain(){
        return this.captain;
    }
    getDivision(){
        return this.div;
    }
}

class League{
    constructor(numDivs){
        this.divisions = [];
        this.teams = {};
        for (var i = 0; i<numDivs; i++){
            this.divisions.push(new Division(`D${i+1}`));
        }
    }
    addTeam(div, team){
        this.teams[this.divisions[div].addTeam(team)] = team;
    }
    getTeams(){
        return {...this.divisions[0].teams, ...this.divisions[1].teams}
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
}

class Match{
    //A match is represented by two teams, a home score, an away score, a time, a date, a location (i.e. field).
    constructor(team1, team2){
        // this.id = id;
        this.played = false;
        this.team1; // actual teams or a string?
        this.team2;
        this.score1 = 0;
        this.score2 = 0;
        // this.time;
        // this.date;
        // this.location;
    }
    playMatch(score1, score2){
        this.played = true;
        this.score1 = score1;
        this.score2 = score2;
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