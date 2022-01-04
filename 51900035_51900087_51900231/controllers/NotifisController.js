const { response } = require('express');
const Notifi = require('../models/Notifi');
const { post } = require('../routes/notifis');
var ObjectId = require("mongodb").ObjectId;

class NotifisController {

    create(req, res) {
        new Notifi({
            content: req.body.content,
            creator: req.body.creator, //lấy username từ session
            avatar: "https://inkythuatso.com/uploads/images/2021/11/logo-tdtu-inkythuatso-01-25-14-39-31.jpg",
            created_at: new Date(),
            updated_at: new Date()
        }).save(function (err) {
            if (err) {
                console.log(err);
                res.json({ success: 'false' })
            } else {
                res.json({ success: 'true' })
            }
        })
    }


    async list(req, res) {
        let notifi = await Notifi.find().sort([[]]);
        res.json(notifi);
    }
}

module.exports = new NotifisController