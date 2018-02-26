var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var PlayMusic = require('playmusic');
require('dotenv').config();


module.exports = function (passport, user) {
  var User = user;
  var demoAuth = 'demo@musicPlayer'

  passport.serializeUser(function (user, done) {
    console.log(user, "seq------")
    return done(null, user.id);
  });

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
      console.log(req.body.email, "  88 ", req.body.password)
      var pm = new PlayMusic();
      let _email = null;
      let _password = null;

      if (req.body.email == demoAuth && req.body.password == demoAuth) {
        _email = process.env.email;
        _password = process.env.password;
      } else {
        _email = req.body.email;
        _password = req.body.password;
      }

      pm.login({
        email: _email,
        password: _password,
        androidId: null
      }, function (err, authToken) {
        if (err) console.error(err, "err");
        return done(null, authToken);
      })
    }
  ));
}