require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

module.exports = { pool };


// // Connection to local DB
// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user:"postgres",
//     host:"localhost",
//     database:"dbceramics",
//     password:"",
//     port:5432
// });

// module.exports = pool;



// // Drop existing tables in cockroachdb
// pool.query('DROP TABLE images', (err, results) => {
//   if (err) throw err;
//   // res.status(200).json(results.rows);
//   console.log("Dropped images table")
//   return;
// })
// pool.query('DROP TABLE projects2', (err, results) => {
//   if (err) throw err;
//   // res.status(200).json(results.rows);
//   console.log("Dropped projects table")
//   return;
// })
// pool.query('DROP TABLE users', (err, results) => {
//   if (err) throw err;
//   // res.status(200).json(results.rows);
//   console.log("Dropped users table")
//   return;
// })



// // Create tables in cockroachdb
// pool.query('CREATE TABLE IF NOT EXISTS users (  ID SERIAL PRIMARY KEY,  email VARCHAR(200) UNIQUE NOT NULL ,  password VARCHAR(200) NOT NULL,  firstname VARCHAR(200),  lastname VARCHAR(200))',
//   (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })

// pool.query('CREATE TABLE IF NOT EXISTS projects2 (    ID SERIAL PRIMARY KEY,    projectname VARCHAR(100) NOT NULL,    projectdesc VARCHAR(10000) NOT NULL,    imgurl VARCHAR(1000000),    startdate DATE DEFAULT NOW()::DATE NOT NULL,    thrown BOOLEAN DEFAULT False NOT NULL,    throwndate DATE,    trimmed BOOLEAN DEFAULT False NOT NULL,    trimmeddate DATE,    bisque BOOLEAN DEFAULT False NOT NULL,    bisquedate DATE,    glazed BOOLEAN DEFAULT False NOT NULL,    glazeddate DATE,    glazefired BOOLEAN DEFAULT False NOT NULL,    glazefireddate DATE,    formclay VARCHAR(1000),    claytype VARCHAR(1000),    startweightclay INT,    dimensionsheight INT,    dimensionslength INT,    dimensionswidth INT,    glazetype VARCHAR(1000),    notes VARCHAR(1000000),    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE);',
//   (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })

// pool.query(`CREATE TABLE IF NOT EXISTS  images( id SERIAL PRIMARY KEY, title VARCHAR(10000) NOT NULL, cloudinary_id VARCHAR(10000) NOT NULL, image_url VARCHAR(128) NOT NULL, project_id SERIAL REFERENCES projects2(id) ON DELETE CASCADE)`,
//   (err, results) => {
//     if (err) throw err;
//     // res.status(200).json(results.rows);
//     return;
//   })

// pool.query(`SELECT * FROM users`,
//   (err, results) => {
//     if (err) throw err;
//     console.log(results.rows)
//     return;
//   })


