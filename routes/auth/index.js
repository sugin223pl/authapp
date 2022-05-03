var express = require('express');
var router = express.Router();
/* GET auth. */

router.get('/:provider(google|facebook|email)', function(req, res, next) {
  if(req.query.redirect) {
    const redirect = Buffer.from(req.query.redirect, 'base64').toString('utf8');
    req.session.redirect = redirect;
    res.redirect('/redirect-' + req.params.provider);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
