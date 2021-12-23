var express = require('express');

var router = express.Router();
var mongodb = require('mongodb');
const Post = require('../models/Post')
const bodyParser = require('body-parser')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var db = require('../db');
var User = require('../models/User');
var Admin = require('../models/Admin');


new Admin({
  authId: "admin1",
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin",
  created: new Date(),
  updated: new Date(),
  avatar: "./public/images/admin.png",
}).save()


router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());




router.get('/inf', function (req, res, next) {
  Post.find()
    .then(result => {
      res.status(200).json({
        postData: result
      });
    })
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

router.get('/signup', function (req, res) {
  res.render('signup');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}
// GET PROFILE PAGE
router.get('/profile-user', isLoggedIn, function (req, res, next) {
  res.render('profile', { authId: req.user.authId, name: req.user.name, email: req.user.email, avatar: req.user.avatar, lop: req.user.lop, khoa: req.user.khoa });
});

router.post('/profile-user', isLoggedIn, function (req, res, next) {
  query = { authId: req.user.authId };
  var data = { name: req.body.Fullname, lop: req.body.lop, khoa: req.body.khoa, updated: new Date() };

  User.findOneAndUpdate(query, { $set: data }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    userTDTU = doc;
    console.log(userTDTU);

  })
  res.render('profile', { authId: req.user.authId, avatar: req.user.avatar, email: req.user.email, name: req.user.name, lop: req.body.lop, khoa: req.body.khoa });
});

/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { username: req.user.name, email: req.user.email, avatar: req.user.avatar });
  //console.log(req.user.name);
});


router.get('/createAccount', function (req, res, next) {
  res.render('createAccount');
})


router.post('/createAccount', function (req, res, next) {
  new PK({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: "PK",
    created: new Date(),
    updated: new Date(),
    avatar: "./public/images/admin.png",
  }).save()
  res.render('createAccount');
})
//log in
// var PK = require('../models/PK');
// const bcrypt = require('bcrypt');
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// router.use(passport.initialize());
// router.use(passport.session());

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   PK.findById(id, function (err, user) {
//     done(err, user);
//   });
// });


// passport.use(new localStrategy(function (username, password, done) {
//   PK.findOne({ username: username }, function (err, user) {
//     console.log(username);
//     if (err) return done(err);
//     if (!user) return done(null, false, { message: 'Incorrect username.' });

//     bcrypt.compare(password, user.password, function (err, res) {
//       if (err) return done(err);
//       if (res === false) return done(null, false, { message: 'Incorrect password.' });
//       console.log(err);
//       return done(null, user);
//     });
//   });
// }));
// function isLoggedOut(req, res, next) {
//   if (!req.isAuthenticated()) return next();
//   res.redirect('/');
// }

router.get('/login', (req, res) => {
  // const response = {
  //   title: "Login",
  //   error: req.query.error
  // }

  res.render('login');
});

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login?error=true'
// }));

// Setup our admin user
// router.get('/setup', async (req, res) => {
//   const exists = await Admin.exists({ username: "admin" });

//   if (exists) {
//     res.redirect('/login');
//     return;
//   };

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err);
//     bcrypt.hash("pass", salt, function (err, hash) {
//       if (err) return next(err);

//       const newAdmin = new User({
//         username: "admin",
//         password: hash
//       });

//       newAdmin.save();

//       res.redirect('/login');
//     });
//   });

module.exports = router;
