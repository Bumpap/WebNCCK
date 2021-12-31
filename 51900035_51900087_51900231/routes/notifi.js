var express = require('express');
var router = express.Router();
var notifiController = require('../controllers/NotifiController')

router.post('/create', notifiController.create);

//router.get('/list', commentsController.list);

module.exports = router;