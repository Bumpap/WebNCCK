var express = require('express');
var router = express.Router();
var postsController = require('../controllers/PostsController')

router.post('/create', postsController.create);

router.get('/list/page/:page/limit/:limit', postsController.list);

module.exports = router;