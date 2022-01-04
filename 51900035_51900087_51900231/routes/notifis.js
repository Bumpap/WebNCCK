var express = require('express');
var router = express.Router();
var notifisController = require('../controllers/NotifisController')

router.post('/create', notifisController.create);

router.get('/list', notifisController.list);

module.exports = router;