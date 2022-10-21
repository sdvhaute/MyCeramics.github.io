CREATE TABLE users (
    ID SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    firstname VARCHAR(200),
    lastname VARCHAR(200),
    dob DATE
)



CREATE TABLE projects2 (
    ID SERIAL PRIMARY KEY,
    projectname VARCHAR(30) NOT NULL,
    projectdesc VARCHAR(100) NOT NULL,
    imgurl VARCHAR(1000000),
    startdate DATE DEFAULT NOW()::DATE NOT NULL,
    thrown BOOLEAN DEFAULT False NOT NULL,
    throwndate DATE,
    trimmed BOOLEAN DEFAULT False NOT NULL,
    trimmeddate DATE,
    bisque BOOLEAN DEFAULT False NOT NULL,
    bisquedate DATE,
    glazed BOOLEAN DEFAULT False NOT NULL,
    glazeddate DATE,
    glazefired BOOLEAN DEFAULT False NOT NULL,
    glazefireddate DATE,
    formclay VARCHAR(1000),
    claytype VARCHAR(1000),
    startweightclay INT,
    dimensionsheight INT,
    dimensionslength INT,
    dimensionswidth INT,
    glazetype VARCHAR(1000),
    notes VARCHAR(1000000),
    user_id SERIAL REFERENCES users(id) NOT NULL
);


CREATE TABLE projects2 (    ID SERIAL PRIMARY KEY,    projectname VARCHAR(30) NOT NULL,    projectdesc VARCHAR(100) NOT NULL,    imgurl VARCHAR(1000000),    startdate DATE DEFAULT NOW()::DATE NOT NULL,    thrown BOOLEAN DEFAULT False NOT NULL,    throwndate DATE,    trimmed BOOLEAN DEFAULT False NOT NULL,    trimmeddate DATE,    bisque BOOLEAN DEFAULT False NOT NULL,    bisquedate DATE,    glazed BOOLEAN DEFAULT False NOT NULL,    glazeddate DATE,    glazefired BOOLEAN DEFAULT False NOT NULL,    glazefireddate DATE,    formclay VARCHAR(1000),    claytype VARCHAR(1000),    startweightclay INT,    dimensionsheight INT,    dimensionslength INT,    dimensionswidth INT,    glazetype VARCHAR(1000),    notes VARCHAR(1000000),    user_id SERIAL REFERENCES users(id) NOT NULL);
