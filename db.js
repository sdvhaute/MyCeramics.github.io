// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user:"postgres",
//     host:"localhost",
//     database:"dbceramics",
//     password:"Biasca789!",
//     port:5432
// });

// module.exports = pool;

require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

module.exports = {pool}  ;


// jumbo-marmot password dxwM66bHqatiT_RGi94fcA

// const { Client } = require("pg");

// const client = new Client(process.env.DATABASE_URL);

// (async () => {
//   await client.connect();
//   try {
//     const results = await client.query("SELECT NOW()");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     client.end();
//   }
// })();

// pool.query('CREATE TABLE users2 (  ID SERIAL PRIMARY KEY,  email VARCHAR(200) NOT NULL,  password VARCHAR(200) NOT NULL,  firstname VARCHAR(200),  lastname VARCHAR(200),  dob DATE)',
//   (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })
// pool.query('CREATE TABLE projects2 (    ID SERIAL PRIMARY KEY,    projectname VARCHAR(30) NOT NULL,    projectdesc VARCHAR(100) NOT NULL,    imgurl VARCHAR(1000000),    startdate DATE DEFAULT NOW()::DATE NOT NULL,    thrown BOOLEAN DEFAULT False NOT NULL,    throwndate DATE,    trimmed BOOLEAN DEFAULT False NOT NULL,    trimmeddate DATE,    bisque BOOLEAN DEFAULT False NOT NULL,    bisquedate DATE,    glazed BOOLEAN DEFAULT False NOT NULL,    glazeddate DATE,    glazefired BOOLEAN DEFAULT False NOT NULL,    glazefireddate DATE,    formclay VARCHAR(1000),    claytype VARCHAR(1000),    startweightclay INT,    dimensionsheight INT,    dimensionslength INT,    dimensionswidth INT,    glazetype VARCHAR(1000),    notes VARCHAR(1000000),    user_id SERIAL REFERENCES users(id) NOT NULL);',
//   (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })
// pool.query( 'DROP TABLE projects2', (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })
// pool.query( 'DROP TABLE users2', (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })



module.exports = { pool };