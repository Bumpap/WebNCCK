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
var ObjectId = require("mongodb").ObjectId;




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
  avatar: "https://inkythuatso.com/uploads/images/2021/11/logo-tdtu-inkythuatso-01-25-14-39-31.jpg"
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
router.get('/profile-user', function (req, res, next) {
  session = req.user;
  console.log(session)
  //console.log(session.name);
  res.render('profile', { name: session.name, email: session.email, avatar: session.avatar, lop: session.lop, khoa: session.khoa });
  //res.render('profile', { authId: req.user.authId, name: req.user.name, email: req.user.email, avatar: req.user.avatar, lop: req.user.lop, khoa: req.user.khoa });
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
  res.render('profile', { username: session.name, email: session.email, avatar: session.avatar, lop: session.lop, khoa: session.khoa });
});
var session = require('express-session');
router.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false
}));
/* GET home page. */
router.get('/', isLoggedIn, function (req, res, next) {
  session = req.user;
  //console.log(session.name);
  res.render('index', { username: session.name, email: session.email, avatar: session.avatar, role: session.role });
  //console.log(req.user.name);
});
router.get('/changePWD', isLoggedIn, function (req, res, next) {
  session = req.user;
  //console.log(session.name);
  res.render('changePWD', { name: session.name, email: session.email, avatar: session.avatar, role: session.role });
  //console.log(req.user.name);
});
router.post('/changePWD', isLoggedIn, function (req, res, next) {
  query = { email: req.user.email };
  var data = { password: req.body.newPWD };

  User.findOneAndUpdate(query, { $set: data }, { new: true }, (err, doc) => {
    if (err) {
      console.log("Something wrong when updating data!");
    }
    userTDTU = doc;
    console.log(userTDTU);

  })
  res.render('changePWD', { name: req.user.name })
});
router.post('/deletePostBtn', function (req, res, next) {
  Post.deleteOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body.id);
    }
  })
})

router.post('/editPostBtn', function (req, res, next) {
  Post.findOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body.id);
    }
  })
})

router.post('/saveEdit', function (req, res, next) {
  Post.findOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body);
    }
  })
})

router.get('/allpost', isLoggedIn, function (req, res, next) {

  Post.find({ creator: req.user.name }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(result);
    }
  })


  // res.render('allpost', { username: req.user.name, email: req.user.email, avatar: req.user.avatar });
  //console.log(req.user.name);
});


router.get('/createAccount', isLoggedIn, function (req, res, next) {
  session = req.user
  console.log(session.name)
  //console.log(session)
  res.render('createAccount', { username: session.name, email: session.email, avatar: session.avatar, lop: session.lop, khoa: session.khoa });
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
      avatar: "https://inkythuatso.com/uploads/images/2021/11/logo-tdtu-inkythuatso-01-25-14-39-31.jpg"
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

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', function (req, res, next) {
  var body = req.body;

  User.findOne({ email: body.email }, function (err, docs) {
    var a = null;
    if (docs == a) {
      console.log(err)
      res.redirect('login')
    } else {
      if (docs.email === body.email && docs.password === body.password) {
        session = docs
        //console.log(session)
        res.render('index', { username: session.name, email: session.email, avatar: session.avatar });
      } else {
        console.log('Error')
      }
    }
  })
})

module.exports = router;
