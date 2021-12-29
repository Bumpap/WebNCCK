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
var user;
var temp = false;
let temp1;
var bcrypt = require("bcryptjs");
new User({
  authId: "01",
  name: "AdminTDT",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin",
  lop: "admin",
  khoa: "admin",
  created: new Date(),
  updated: new Date(),
  avatar: "https://inkythuatso.com/uploads/images/2021/11/logo-tdtu-inkythuatso-01-25-14-39-31.jpg"
}).save()

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());




router.get('/inf', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
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
  temp = false;
});


// GET PROFILE PAGE
router.get('/profile-user', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  //console.log(session.name);
  res.render('profile', { name: user.name, email: user.email, avatar: user.avatar, lop: user.lop, khoa: user.khoa });
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

router.get('/changePWD', isLoggedIn, function (req, res, next) {

  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  res.render('changePWD', { name: user.name, email: user.email, avatar: user.avatar, role: user.role });

});
router.post('/changePWD', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    console.log(temp1)
  }
  query = { email: user.email };
  //console.log(email)
  var newPWD = req.body.newPWD;
  var confPWD = req.body.passwordConf;
  if (newPWD != confPWD) {
    console.log("Error");
  } else {
    var data = { password: newPWD };

    User.findOneAndUpdate(query, { $set: data }, { new: true }, (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      userTDTU = doc;
      //console.log(userTDTU);

    })
  }
  res.render('changePWD', { name: user.name, email: user.email, avatar: user.avatar, role: user.role })
});
router.post('/deletePostBtn', isLoggedIn, function (req, res, next) {
  Post.deleteOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body.id);
    }
  })
})

router.post('/editPostBtn', isLoggedIn, function (req, res, next) {
  Post.findOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body.id);
    }
  })
})

router.post('/saveEdit', isLoggedIn, function (req, res, next) {
  Post.findOne({ _id: ObjectId((req.body.id)) }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(req.body);
    }
  })
})

router.get('/allpost', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  Post.find({ creator: user.name }, function (err, result) {
    if (err) console.log(err);

    else {
      res.send(result);
    }
  })
});


router.get('/createAccount', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  console.log(session.name)

  res.render('createAccount', { username: user.name, email: user.email, avatar: user.avatar, lop: user.lop, khoa: user.khoa });
})


router.post('/createAccount', isLoggedIn, function (req, res, next) {

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {
    var userData = {
      authId: "",
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "Faculty",
      lop: "Phong/khoa",
      khoa: "Phong/Khoa",
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


router.get('/', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  res.render('index', { name: user.name, email: user.email, avatar: user.avatar, role: user.role });

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
        const obj = JSON.parse(JSON.stringify(docs));
        //console.log(temp1)
        temp1 = obj
        temp = true;
        return res.redirect('/');
        // console.log(temp)
      } else {
        console.log('Error')
      }
    }
  })
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() || temp) {
    console.log(temp)
    return next();
  }
  res.redirect('/login');
}

// router.get('/login', function (req, res, next) {
//   res.render('temp');
// })
module.exports = router;
