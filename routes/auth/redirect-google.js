var express = require('express');
var router = express.Router();
const passport = require('passport');
require('./oauth');
/* GET auth. */

router.get('/', function(req, res, next) {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    callbackURL: `${req.protocol}://${req.get("host")}/google-callback`
  })(req, res, next)
});

module.exports = router;
