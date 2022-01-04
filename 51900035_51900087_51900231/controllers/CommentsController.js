const { response } = require('express');
const Comment = require('../models/Comment');
const { post } = require('../routes/comments');
var ObjectId = require("mongodb").ObjectId;

class CommentsController {

    create(req, res) {
        new Comment({
            content: req.body.content,
            creator: req.user.name, //lấy username từ session
            avatar: req.user.avatar,
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
        let comments = await Comment.find().sort([[]]);
        res.json(comments);
    }
}

module.exports = new CommentsController