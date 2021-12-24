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



new User({
  authId: "admin1",
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin",
  lop: "",
  khoa: "",
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

var bcrypt = require("bcryptjs");
router.post('/createAccount', function (req, res, next) {

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    var userData = {
      authId: "",
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "P_K",
      lop: "",
      khoa: "",
      created: new Date(),
      updated: new Date(),
      avatar: "./public/images/admin.png",
    }
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/createAccount');
      }
    });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  var body = req.body;
  //console.log(body);
  if (body.email === "admin@gmail.com" && body.password === "123456") {
    res.render('index', { username: "Admin", avatar: "./public/images/admin.png", email: body.email });
  }
  else {
    User.findOne({ email: body.email }, function (err, docs) {
      // console.log(docs.password)
      // console.log(body.password)
      var a = null;
      if (docs == a) {
        console.log(err)
        res.redirect('/login')
      } else {
        if (docs.email === body.email && docs.password === body.password) {
          res.render('index', { username: docs.name, email: docs.email, avatar: docs.avatar });
        } else {
          console.log('Error')
        }
      }
    });
  }
})


module.exports = router;
