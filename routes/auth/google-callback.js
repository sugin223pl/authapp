var express = require('express');
var router = express.Router();
const passport = require('passport');
require('./oauth');
/* GET auth. */
router.get('/', passport.authenticate('google', {
  successRedirect: '/redirect/success',
  failureRedirect: '/redirect/failed'
}));

module.exports = router;
