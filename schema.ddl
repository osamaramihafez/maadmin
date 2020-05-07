CREATE TABLE team
(
  teamId           SERIAL, 
  teamName         VARCHAR(20)    NOT NULL, 
  division          INTEGER         NOT NULL,  
  points            INTEGER  DEFAULT 0, 
  fixturesPlayed   INTEGER   DEFAULT 0, 
  wins              INTEGER  DEFAULT 0,
  losses             INTEGER  DEFAULT 0,
  draws             INTEGER  DEFAULT 0,
  goalsFor          INTEGER  DEFAULT 0,
  goalsAgainst     INTEGER   DEFAULT 0,
  goalDifferential INTEGER   DEFAULT 0,

  CONSTRAINT teamPk PRIMARY KEY (teamId)
);

CREATE TABLE division{
  divId SERIAL PRIMARY KEY,
  season INTEGER NOT NULL,

  constraint seasonFk foreign key (season) references season(seasonId)
}

CREATE TABLE season{
  seasonId SERIAL PRIMARY KEY,
  league VARCHAR(20),
  
  constraint adminFk foreign key (league) references admin(username)
}

CREATE TABLE league{
  leagueId SERIAL PRIMARY KEY,
  admin VARCHAR(20),
  
  constraint adminFk foreign key (admin) references admin(username)
}

CREATE TABLE admin
(
  username VARCHAR(20) NOT NULL PRIMARY KEY,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE player
(
  playerId INTEGER PRIMARY KEY, 
  firstName VARCHAR(20) NOT NULL, 
  lastName VARCHAR(30) NOT NULL, 
  age INTEGER NOT NULL,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  yellowCards INTEGER DEFAULT 0,
  redCards INTEGER DEFAULT 0,
  appearances INTEGER DEFAULT 0,
  email VARCHAR(50),
  phoneNumber VARCHAR(50) NOT NULL
);

CREATE TABLE match 
(
  matchId INTEGER NOT NULL PRIMARY KEY,
  fieldId INTEGER NOT NULL,
  matchDate TIMESTAMP NOT NULL,
  teamScore INTEGER,
  otherTeamScore INTEGER
   
);

CREATE TABLE teamMatch 
(
  /* Maps a team to a match and a match to a team */
  teamId          INTEGER         NOT NULL,
  matchId         INTEGER         NOT NULL,
  
  CONSTRAINT tmatchPk PRIMARY KEY (teamId, matchId),
  CONSTRAINT mteamFk FOREIGN KEY (teamId) REFERENCES team (teamId),
  CONSTRAINT tmatchFk FOREIGN KEY (matchId) REFERENCES match (matchId)
);

CREATE TABLE teamPlayer
(
  /* Maps a player to a team, only one team per player */
  teamId          INTEGER NOT NULL,
  playerId         INTEGER NOT NULL,
  isCaptain         BOOLEAN NOT NULL,

  CONSTRAINT tplayerPk PRIMARY KEY (playerId),
  CONSTRAINT pteamFk FOREIGN KEY (teamId) REFERENCES team (teamId),
  CONSTRAINT tplayerFk FOREIGN KEY (playerId) REFERENCES player (playerId)
);


insert into admin (username, password) values ('maadmin', 'bananapillow')