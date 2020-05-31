CREATE TABLE league(
  leaguename VARCHAR(50) PRIMARY KEY
);

CREATE TABLE admin
(
  username VARCHAR(20) NOT NULL PRIMARY KEY,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE leagueAdmin(
  leaguename VARCHAR(50),
  admin VARCHAR(20),

  constraint alPk primary key (admin, leaguename),
  constraint adminFk foreign key (admin) references admin(username) on update cascade on delete cascade,
  constraint aLeagueFk foreign key (leaguename) references league(leaguename) on update cascade on delete cascade
);

-- Currently not using season, I think I can go about without it.
-- CREATE TABLE season(
--   seasonId SERIAL PRIMARY KEY,
--   league VARCHAR(20),
--   startDate TIMESTAMP,
--   endDate TIMESTAMP,

--   constraint leagueFk foreign key (league) references admin(username) on update cascade on delete cascade
-- );

CREATE TABLE division(
  divId INTEGER NOT NULL,
  league VARCHAR(50) NOT NULL,
  capacity INTEGER,

  constraint leagueDivFk foreign key (league) references league(leaguename) on update cascade on delete cascade,
  constraint divPk primary key (divId, league)
);

CREATE TABLE team
(
  teamId           SERIAL, 
  teamname         VARCHAR(20) NOT NULL, 
  division          INTEGER NOT NULL,  
  league          VARCHAR(50) NOT NULL,  
  points            INTEGER  DEFAULT 0, 
  fixturesPlayed   INTEGER   DEFAULT 0, 
  wins              INTEGER  DEFAULT 0,
  losses             INTEGER  DEFAULT 0,
  draws             INTEGER  DEFAULT 0,
  goalsFor          INTEGER  DEFAULT 0,
  goalsAgainst     INTEGER   DEFAULT 0,
  goalDifferential INTEGER   DEFAULT 0,

  
  CONSTRAINT teamPk PRIMARY KEY (teamId),
  UNIQUE (teamname, division, league),  
  constraint tDivisionFk foreign key (division, league) references division(divId, league) on update cascade on delete cascade
);

CREATE TABLE player
(
  playerId SERIAL, 
  firstName VARCHAR(30) NOT NULL, 
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
  /* Should probably restructure this somehow */
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
  CONSTRAINT mteamFk FOREIGN KEY (teamId) REFERENCES team (teamId) on update cascade on delete cascade,
  CONSTRAINT tmatchFk FOREIGN KEY (matchId) REFERENCES match (matchId) on update cascade on delete cascade
);

CREATE TABLE teamPlayer
(
  /* Maps a player to a team, only one team per player */
  teamId          INTEGER NOT NULL,
  playerId         INTEGER NOT NULL,
  isCaptain         BOOLEAN NOT NULL,

  CONSTRAINT tplayerPk PRIMARY KEY (playerId),
  CONSTRAINT pteamFk FOREIGN KEY (teamId) REFERENCES team (teamId) on update cascade on delete cascade,
  CONSTRAINT tplayerFk FOREIGN KEY (playerId) REFERENCES player (playerId) on update cascade on delete cascade
);


insert into admin (username, password) values ('maadmin', 'bananapillow');
insert into admin (username, password) values ('123', '456');
insert into league (leaguename) values ('Mens 18+');
insert into league (leaguename) values ('Mens 35+');
insert into league (leaguename) values ('Youth');
insert into leagueAdmin (leaguename, admin) values ('Mens 18+', 'maadmin');
insert into leagueAdmin (leaguename, admin) values ('Mens 35+', 'maadmin');
insert into leagueAdmin (leaguename, admin) values ('Youth', 'maadmin');