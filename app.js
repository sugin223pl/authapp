var express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');


var app = express();
app.use(cors());
app.set('trust proxy', 1);
app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var authRouter = require('./routes/auth');
var responseRouter = require('./routes/response');
var emailCallback = require('./routes/auth/email-callback');
var googleCallback = require('./routes/auth/google-callback');
var facebookCallback = require('./routes/auth/facebook-callback');
var redirectGoogle = require('./routes/auth/redirect-google');
var redirectFacebook = require('./routes/auth/redirect-facebook');
var redirectEmail = require('./routes/auth/redirect-email');


app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/email-callback', emailCallback);
app.use('/google-callback', googleCallback);
app.use('/facebook-callback', facebookCallback);
app.use('/response', responseRouter);
app.use('/redirect-google', redirectGoogle);
app.use('/redirect-facebook', redirectFacebook);
app.use('/redirect-email', redirectEmail);

module.exports = app;
