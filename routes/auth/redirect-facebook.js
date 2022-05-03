var express = require('express');
var router = express.Router();
const passport = require('passport');
require('./oauth');
/* GET auth. */

router.get('/', function(req, res, next) {
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
    callbackURL: `${req.protocol}://${req.get("host")}/facebook-callback`
  })(req, res, next)
});
module.exports = router;
