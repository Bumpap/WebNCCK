var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');
var express = require('express');
var router = express.Router();
//const swot = require("swot-node")
passport.use(new GoogleStrategy({
  clientID: "782422261734-v28esemjjrjkqibbojlpd7ls3d9kkr2k.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    const authId = 'google:' + profile.id;
    //console.log(eMail);
    //If student email
    User.findOne({ 'authId': authId })
      .then(user => {
        var eMail = new Buffer(profile.emails[0].value);
        const temp1 = new Buffer("@student.tdtu.edu.vn");
        const temp2 = new Buffer("@tdtu.edu.vn");
        if (eMail.compare(temp1) > 0 || eMail.compare(temp2) > 0) return done(null, user);
        new User({
          authId: authId,
          name: profile.displayName,
          email: profile.emails[0].value,
          created: new Date(),
          role: 'student',
        }).save()
          .then(user => done(null, user))
          .catch(err => done(err, null));
      })
      .catch(err => {
        if (err) return done(err, null);
      });

    // If teacher email
    // User.findOne({ 'authId': authId })
    //   .then(user => {
    //     var eMail = new Buffer(profile.emails[0].value);
    //     const temp2 = new Buffer("@tdtu.edu.vn");
    //     if (eMail.compare(temp2) > 0) return done(null, user);
    //     new User({
    //       authId: authId,
    //       name: profile.displayName,
    //       email: profile.emails[0].value,
    //       created: new Date(),
    //       role: 'teacher',
    //     }).save()
    //       .then(user => done(null, user))
    //       .catch(err => done(err, null));
    //   })
    //   .catch(err => {
    //     if (err) return done(err, null);
    //   });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
})

router.get('/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router;
