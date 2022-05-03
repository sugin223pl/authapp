var express = require('express');
var router = express.Router();

const signedIn = (req, res, next) => {
  const { user } = req;
  user !== undefined ? next() : res.sendStatus(401);
};

/* GET success page. */
router.get('/:resp(success|failed)', signedIn, function(req, res, next) {
  const { redirect } = req.session;
  const user = req.user.userData;
  const userdata = Buffer.from(JSON.stringify(user), 'utf8').toString('base64');
  res.redirect(redirect + '?userdata=' + userdata);
});

module.exports = router;
