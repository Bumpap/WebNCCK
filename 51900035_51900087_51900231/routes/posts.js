var express = require('express');
var router = express.Router();
var postsController = require('../controllers/PostsController')

router.post('/create', postsController.create);

router.get('/list', postsController.list);

module.exports = router;