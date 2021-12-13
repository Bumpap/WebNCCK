var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const Post = require('../models/Post')

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
