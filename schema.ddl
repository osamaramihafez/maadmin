CREATE TABLE team
(
  teamId           INTEGER         NOT NULL PRIMARY KEY, 
  teamName         VARCHAR(20)    NOT NULL, 
  division          INTEGER         NOT NULL,  
  points            INTEGER         NOT NULL, 
  fixturesPlayed   INTEGER         NOT NULL, 
  wins              INTEGER         NOT NULL,
  loses             INTEGER         NOT NULL,
  draws             INTEGER         NOT NULL,
  goalsScored      INTEGER         NOT NULL,
  goalsAllowed     INTEGER         NOT NULL,
  goalDifferential INTEGER         NOT NULL,

  CONSTRAINT teamNunq UNIQUE (teamName)
);

CREATE TABLE admin
(
  username VARCHAR(20) NOT NULL PRIMARY KEY,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE player
(
  playerId INTEGER NOT NULL PRIMARY KEY, 
  firstName VARCHAR(20) NOT NULL, 
  lastName VARCHAR(30) NOT NULL, 
  age INTEGER NOT NULL,
  teamId INTEGER NOT NULL,
  goals INTEGER NOT NULL, 
  assists INTEGER NOT NULL, 
  yellowCards INTEGER NOT NULL, 
  redCards INTEGER NOT NULL, 
  appearances INTEGER NOT NULL,
  email VARCHAR(50) NOT NULL,
  phoneNumber VARCHAR(50) NOT NULL,

  CONSTRAINT teamPlayerFk FOREIGN KEY (teamId) REFERENCES team (teamId)
);

CREATE TABLE match 
(
  matchId INTEGER NOT NULL PRIMARY KEY,
  locationId INTEGER NOT NULL, 
  positionId INTEGER NOT NULL,
  matchDate TIMESTAMP NOT NULL,
  teamScore INTEGER NOT NULL,
  otherTeamScore INTEGER NOT NULL
   
);

CREATE TABLE teamMatch 
(
  teamId          INTEGER         NOT NULL,
  matchId         INTEGER         NOT NULL,
  
  CONSTRAINT tmatchPk PRIMARY KEY (teamId, matchId),
  CONSTRAINT mteamFk FOREIGN KEY (teamId) REFERENCES team (teamId),
  CONSTRAINT tmatchFk FOREIGN KEY (matchId) REFERENCES match (matchId)
);

insert into admin (username, password) values ('maadmin', 'bananapillow')