let passport = require('passport');
let User = require('../models/User');

var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// github Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },

    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      let profileData = profile._json;

      var userData = {
        name: profileData.name,
        email: profileData.twitter_username,
        country: profileData.location,
        age: 22,
        password: profileData.twitter_username,
      };

      User.findOne({ email: userData.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userData, (err, createdUser) => {
            if (err) return done(err);
            done(null, createdUser);
          });
        }
        done(null, user);
      });
    }
  )
);

// google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      let profileData = profile._json;
      var userData = {
        name: profileData.name,
        email: profileData.sub,
        country: profileData.locale,
        age: 22,
        passport: profileData.name,
      };

      User.findOne({ email: userData.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userData, (err, createdUser) => {
            if (err) return done(err);
            done(null, createdUser);
          });
        }
        done(null, user);
      });
    }
  )
);

// serializer

passport.serializeUser(function (user, done) {
  done(null, user);
});

// deserializer

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
