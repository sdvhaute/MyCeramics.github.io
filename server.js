const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const { pool } = require("./db");

// Cloudinary upset
const http = require('http');
const util = require('util');

const cloudinary = require("cloudinary");
require("dotenv").config();

const Formidable = require('formidable');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const initializePassport = require('./public/scripts/passport-config');

initializePassport(passport);




const userRoutes = require('./src/user/routes');
// const creatorRoutes = require('./src/creator/routes');
const projectRoutes = require('./src/project/routes');

// App configuration
const app = express();
const port = 2000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('ejs', ejsMate);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(flash());

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})


app.use('/api/v1/', userRoutes);
app.use('/api/v1/projects', projectRoutes);


app.get('/', (req, res) => {
  res.render('home.ejs');
})


app.listen(port, () => {
  console.log(`App listening on ${port}`)
});


