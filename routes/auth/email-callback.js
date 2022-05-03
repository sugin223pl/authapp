var express = require('express');
var router = express.Router();
const passport = require('passport');
require('./oauth');
/* GET auth. */
router.get('/', passport.authenticate('email', {
  successRedirect: '/response/success',
  failureRedirect: '/response/failed'
}));

module.exports = router;
