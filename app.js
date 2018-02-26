const express = require('express')
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
var auth = require('./routes/auth');
const reactPlayerRouter = require('./routes/reactPlayer-routes');
const app = express();
require('dotenv').config();

app.use(logger('dev'));

// middlewares
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// static files
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//setting up port & listen 
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`listening on port ${PORT} 00`);
});

app.use('/rPlayer', reactPlayerRouter);
app.use('/auth', auth);
app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});

app.get('/', (req, res) => {
  res.send('We are live!');
});
