const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var PK = require('../models/PK');
var express = require('express');
var router = express.Router();

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    PK.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new localStrategy(function (username, password, done) {
    PK.findOne({ username: username }, function (err, user) {
        console.log(username);
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, { message: 'Incorrect password.' });
            console.log(err);
            return done(null, user);
        });
    });
}));
// router.get('/login', (req, res) => {
//     const response = {
//         title: "Login",
//         error: req.query.error
//     }

//     res.render('login', response);
// });

// router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login?error=true'
// }));

module.exports = router;