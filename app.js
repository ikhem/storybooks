const express = require('express');
const mongoose = require('mongoose');
const chalk = require('chalk');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Load User Model
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// Map globabl promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.get('/', (req, res) => {
  res.send('it works');
})

app.use(cookieParser());
app.use(session({
  secret: 'cookie',
  resave: false,
  saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

// Use Routes
app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${ chalk.blue('Server running on port')} ${ chalk.red(port) }`);
})