var express = require('express');
var router = express.Router();
var commentsController = require('../controllers/CommentsController')

router.post('/create', commentsController.create);

router.get('/list', commentsController.list);

module.exports = router;