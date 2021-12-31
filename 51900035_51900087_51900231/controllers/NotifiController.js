const { response } = require('express');
const Notifi = require('../models/Notifi');
const { post } = require('../routes/posts');
var ObjectId = require("mongodb").ObjectId;


class NotifiController {

    create(req, res) {
        new Notifi({
            content: req.body.content,
            creator: "Khoa Công Nghệ Thông Tin", //lấy username từ session
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
    // async list(req, res) {
    //     let page = parseInt(req.params.page);
    //     let limit = parseInt(req.params.limit);
    //     let skip = (page - 1) * limit;
    //     let posts = await Notifi.find().sort([['created_at', -1]]).skip(skip).limit(limit);
    //     res.json(posts);
    // }
}

module.exports = new NotifiController