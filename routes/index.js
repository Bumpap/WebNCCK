var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const Post = require('../models/Post')
const bodyParser = require('body-parser')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('../db');

var alert = require('alert')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// async loginGoogle(req, res, next) {

// }
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', function (req, res, next) {
  if (req.body.username == "admin@gmail.com" && req.body.password == "123456") {
    req.session.user = req.body.username;
    res.render('index', { username: req.session.user, email: req.session.user });
  } else {
    let error = undefined
    if (req.body.username == '') {
      error = "Please fill your username"
    }

    else if (req.body.password == '') {
      error = "Please fill your password"
    }

    else
      error = "Oops, something has been wrong"
    res.locals.error = error
    res.render('login', { error });
    console.log(error)
  }
});
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
  res.render('profile', { username: req.user.name, email: req.user.email });
});

// router.get('/profile-user', function (req, res, next) {
//   res.render('profile', { username: req.session.user, email: req.session.user });
// });
/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { username: req.user.name, email: req.user.email });
  //console.log(req.user.name);
});

module.exports = router;
