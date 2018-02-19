var express = require('express');
var router = express.Router();
var passport = require('passport')
require('../config/auth/local.js')(passport);


/* LOGIN ROUTER */
router.post('/signin', function (req, res, next) {
  passport.authenticate('local-signin', function (err, user, info) {
    // console.log('iiiii')
    if (err) {
      res.status(500).send('Something broke!');
      return next(err);
    }
    if (!user) {
      // res.status(400).send('User already exists');
      res.status(400).json({
        message: 'Oops! Wrong password.'
      });
      return next(err);
    }
    if (user) {
      console.log('ready');
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      });
    }
  })(req, res, next);
});


/* Verfying Auth */
router.get('/checkloggedIn', function (req, res, next) {
  console.log(req.user, "helloooooo--------");
  console.log(req.isAuthenticated(), "helloooooo****************");
  if (req.isAuthenticated())
    return next();
  else res.status(400).json({
    message: 'Oops! Please login.'
  });
  //res.redirect('/');
}, function (req, res) {
  console.log(req.user, 'user ')
  res.json({
    user: req.user
  })
});


router.get('/logout', (req, res) => {
  req.logout();
});


module.exports = router;
