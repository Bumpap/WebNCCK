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
    res.render('index');
  } else {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'Invalid email or password',
    }
    res.redirect('/login');
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}


/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
