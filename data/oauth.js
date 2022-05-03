const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const md5 = require('md5');
const conn = require(__dirname + '/conn.js');
const pass = md5('4O0SUO4RUB72');

const signInOrSignUp = async (profile) => {
  const getuser = await conn('users').where('provider_id', profile.id);
  const found = getuser.length > 0;
  let user = {};
  if (found) {
    user = getuser[0];
  } else {
    user.name = profile.displayName;
    user.email = null;
    user.password = pass;
    user.avatar = null;
    user.provider = profile.provider;
    user.provider_id = profile.id;
    user.created_at = new Date();
    user.updated_at = new Date();

    switch (profile.provider) {
      case 'facebook':
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.avatar = profile.photos[0].value;
        user.email = profile.emails[0].value;
        break;
      case 'google':
        user.firstName = profile.name.givenName;
        user.lastName = profile.name.familyName;
        user.avatar = profile.picture;
        user.email = profile.email;
        break;
      default:
        break;
    }

    console.log('user insert : ', user);
    let insert = await conn('users').insert(user);
    user.id = insert[0];
  }
  
  profile.userData = user;
  return profile;
}

// Auth with google
passport.use(new GoogleStrategy({
    clientID:     '664311173646-t4cda5rfhh777l8sckql18pphom7nf6d.apps.googleusercontent.com',
    clientSecret: 'EZLFGIOBeKAfPwGf2JZdn3dL',
    callbackURL: "http://localhost/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const dbuser = await signInOrSignUp(profile);
    return done(null, dbuser);
  }
));

// Auth with facebook
passport.use(new FacebookStrategy({
    clientID: '898921100931485',
    clientSecret: '9aff514bfcac775bc1c241507ad0fa6c',
    callbackURL: "http://localhost/auth/facebook/callback",
    passReqToCallback   : true,
    profileFields: ['id', 'displayName', 'email', 'name', 'picture.type(large)', 'profileUrl']
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const dbuser = await signInOrSignUp(profile);
    return done(null, dbuser);
}));

passport.serializeUser((user, done) => { 
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  // const userdone = await conn('users').where('id', user.id);
  // console.log('deserializeUser', userdone);
  // console.log('deserializeUser2', user);
  done(null, user);
});