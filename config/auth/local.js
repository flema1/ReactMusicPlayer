var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var PlayMusic = require('playmusic');
require('dotenv').config();


module.exports = function (passport, user) {
  var User = user;

  passport.serializeUser(function (user, done) {
    console.log(user, "seq------")
    return done(null, user.id);
  });

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
      console.log(req.body.email, "  88 ", req.body.password)
      var pm = new PlayMusic();
      pm.login({
        email: /*process.env.email*/ req.body.email,
        password: /*process.env.password*/ req.body.password,
        androidId: null
      }, function (err, authToken) {
        if (err) console.error(err, "err");
        // console.log(authToken, 'dataAAAAAAAA');
        return done(null,authToken);
      })
    }
  ));
}