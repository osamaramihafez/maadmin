CREATE TABLE league(
  leagueName VARCHAR(20) PRIMARY KEY
);

CREATE TABLE admin
(
  username VARCHAR(20) NOT NULL PRIMARY KEY,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE leagueAdmin(
  leagueName VARCHAR(20),
  admin VARCHAR(20),

  constraint alPk primary key (admin, leagueName),
  constraint adminFk foreign key (admin) references admin(username) on update cascade,
  constraint aLeagueFk foreign key (leagueName) references league(leagueName) on update cascade
);

CREATE TABLE season(
  seasonId SERIAL PRIMARY KEY,
  league VARCHAR(20),
  startDate TIMESTAMP,
  endDate TIMESTAMP,

  constraint leagueFk foreign key (league) references admin(username) on update cascade
);

CREATE TABLE division(
  divId SERIAL PRIMARY KEY,
  season INTEGER NOT NULL,
  capacity INTEGER,

  constraint seasonFk foreign key (season) references season(seasonId) on update cascade
);

CREATE TABLE team
(
  teamId           SERIAL, 
  teamName         VARCHAR(20) NOT NULL, 
  division          INTEGER NOT NULL,  
  league          VARCHAR(20) NOT NULL,  
  points            INTEGER  DEFAULT 0, 
  fixturesPlayed   INTEGER   DEFAULT 0, 
  wins              INTEGER  DEFAULT 0,
  losses             INTEGER  DEFAULT 0,
  draws             INTEGER  DEFAULT 0,
  goalsFor          INTEGER  DEFAULT 0,
  goalsAgainst     INTEGER   DEFAULT 0,
  goalDifferential INTEGER   DEFAULT 0,

  
  CONSTRAINT teamPk PRIMARY KEY (teamId),
  constraint tLeagueFk foreign key (league) references league(leagueName) on update cascade,
  constraint tDivisionFk foreign key (division) references division(divId) on update cascade

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
  CONSTRAINT mteamFk FOREIGN KEY (teamId) REFERENCES team (teamId) on update cascade,
  CONSTRAINT tmatchFk FOREIGN KEY (matchId) REFERENCES match (matchId) on update cascade
);

CREATE TABLE teamPlayer
(
  /* Maps a player to a team, only one team per player */
  teamId          INTEGER NOT NULL,
  playerId         INTEGER NOT NULL,
  isCaptain         BOOLEAN NOT NULL,

  CONSTRAINT tplayerPk PRIMARY KEY (playerId),
  CONSTRAINT pteamFk FOREIGN KEY (teamId) REFERENCES team (teamId) on update cascade,
  CONSTRAINT tplayerFk FOREIGN KEY (playerId) REFERENCES player (playerId) on update cascade
);


insert into admin (username, password) values ('maadmin', 'bananapillow');
insert into admin (username, password) values ('123', '456');
insert into league (leagueName) values ('Mens 18+');
insert into league (leagueName) values ('Mens 35+');
insert into league (leagueName) values ('Youth');
insert into leagueAdmin (leagueName, admin) values ('Mens 18+', 'maadmin');
insert into leagueAdmin (leagueName, admin) values ('Mens 35+', 'maadmin');
insert into leagueAdmin (leagueName, admin) values ('Youth', 'maadmin');