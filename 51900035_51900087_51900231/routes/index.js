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
let post;
var bcrypt = require("bcryptjs");
let error;
var formatPWD = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

User.findOne({ email: "admin@gmail.com" })
  .then(user => {
    if (user) return;
    else {
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
    }
  });


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



router.get('/changePWD', isLoggedIn, function (req, res, next) {
  user = temp1
  //console.log(temp1)
  res.render('changePWD', { name: user.name, email: user.email, avatar: user.avatar, role: user.role });

});
router.post('/changePWD', isLoggedIn, function (req, res, next) {
  var error;
  user = temp1
  //console.log(email)
  //console.log(formatPWD.equals("12345678aA"))
  var oldPWD = req.body.oldPWD;
  var newPWD = req.body.newPWD;
  var confPWD = req.body.passwordConf;
  if (user.password !== oldPWD) {
    error = "Old password is not matching";
    res.render('changePWD', { error, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
  }
  else if (newPWD != confPWD) {
    error = "Not machting password"
    res.render('changePWD', { error: error, name: user.name, email: user.email, avatar: user.avatar, role: user.role })

  }
  else if (newPWD.length < 8 || confPWD.lengths < 8) {
    error = "Password must be 8 characters long"
    res.render('changePWD', { error: error, name: user.name, email: user.email, avatar: user.avatar, role: user.role })

  }
  else {
    var data = { password: newPWD };
    query = { email: user.email };
    User.findOneAndUpdate(query, { $set: data }, { new: true }, (err, doc) => {
      if (err) {
        error = "Error when updating password.Please try again later"
        res.render('changePWD', { error, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
      } else {
        userTDTU = doc;
        const success = "Register success"
        res.render('changePWD', { success, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
      }

    })
  }

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
      res.render('allpost', { username: user.name, email: user.email, avatar: user.avatar, content: user.content, result: result });
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
  res.render('createAccount', { username: "AdminTDT", email: "admin@tdtu.edu.vn", avatar: user.avatar });

})

router.get('/manageAccount', isLoggedIn, function (req, res, next) {
  if (req.user) {
    user = req.user
  } else {
    user = temp1
    //console.log(temp1)
  }
  User.find({}, function (err, result) {
    if (err) console.log(err);

    else {
      console.log(result)
      var i = 0;
      res.render('manageAccount', { username: user.name, email: user.email, avatar: user.avatar, content: user.content, result: result });
    }
  })
})

router.post('/createAccount', isLoggedIn, function (req, res, next) {
  user = temp1
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          error = "Invalid Username or Password"
          return res.render('createAccount', { error: error, username: "AdminTDT", email: "admin@tdtu.edu.vn", avatar: user.avatar })
        }
        else {
          var userData = {
            authId: "",
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: "faculty",
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
              const success = "Register success"
              res.render('createAccount', { success: success, username: "AdminTDT", email: "admin@tdtu.edu.vn", avatar: user.avatar });
            }
          });
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

  if (user.role == "admin") {
    res.render('index', { name: user.name, email: user.email, avatar: user.avatar, admin: user.role });
  }

  else if (user.role == "faculty") {
    res.render('index', { name: user.name, email: user.email, avatar: user.avatar, faculty: user.role });
  }

  else {
    res.render('index', { name: user.name, email: user.email, avatar: user.avatar, student: user.role });

  }


});
router.get('/login', function (req, res, next) {
  res.render('login');
});


router.post('/login', function (req, res, next) {
  var body = req.body;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (user.email === body.email && user.password === body.password) {
          const obj = JSON.parse(JSON.stringify(user));
          //console.log(temp1)
          temp1 = obj
          temp = true;
          return res.redirect('/');
        } else {
          const error = "Invalid Username or Password"
          console.log(error)
          return res.render('login', { error: error })
        }
      }
      else {
        const error = "Invalid Username or Password"
        console.log(error)
        return res.render('login', { error: error })
      }
    });
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated() || temp) {
    console.log(temp)
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
