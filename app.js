const express = require('express')
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
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

// static files
app.use(express.static('public'));

//setting up port & listen 
 const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT} 00`);
});


app.get('/', (req, res) => {
  res.send('We are live!');
});

app.use('*', (req, res) => {
  res.status(400).json({
    message: 'Endpoint not found!',
  });
});





/*

const reactPlayerRoutes = require('./routes/reactPlayer-routes');
app.use('/reactPlayer', reactPlayerRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


app.get('/', (req, res) => {
  res.render('reactplayer/home');
});
app.get('/index', (req, res) => {
  res.render('index');
});
/*app.get('/hi', function (req, res) {
  res.send('Hello World!')
});*/