CREATE DATABASE covid_group;

-- use '\c 114-3' if you are using a terminal

CREATE TABLE Users (
    userid SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    state varchar(255),
	loggedin int
);


CREATE TABLE comments (
    comment char(255) NOT NULL,
	date timestamp,
    userid integer REFERENCES users (userid)
);

CREATE TABLE states (
    state varchar(255),
	deaths int,
	deathconfirmed int,
	deathincrease int,
	deathprobable int,
	hospitalized int,
	hospitalizedcumulative int,
	hospitilizedcurrently int,
	hospitalizedincrease int,
	inicucumulative int,
	inicucurrently int,
	lastupdateet varchar,
	negative int,
	onventilatorcumulative int,
	onventilatorcurrently int,
	positive int,
	positivecasesviral int,
	positiveincrease int,
	probablecases int,
	recovered int
);

-- query to fill up dummy data in comments and users tables

INSERT INTO Users(userid, username, password, state)
  VALUES(1, 'TexasMan', 'pwd', 'TX', 0),
  (2,'coolguy1234','pwd', 'NM', 0),
  (3,'proudArizonaWOman','pwd', 'AZ', 0)
  ;


INSERT INTO comments(comment, date, userid)
VALUES('I got the Rona from the Boulder Whole Foods.','20200831',1),
('Welcome to Arizrona ','20200831', 3),
('I gave my sister tha covid.','20200831', 2),
('Help I have fallen and cannot get up','20200831', 1),
('Covid is for the weak.','20200831', 1)
;
