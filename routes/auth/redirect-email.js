var express = require('express');
var router = express.Router();
const passport = require('passport');
require('./oauth');
/* GET auth. */
router.get('/', passport.authenticate('email', {
  scope: ['email', 'profile']
}));

module.exports = router;
