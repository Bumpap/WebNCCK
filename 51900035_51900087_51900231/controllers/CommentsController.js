const { response } = require('express');
const Comment = require('../models/Comment');
const { post } = require('../routes/comments');
var ObjectId = require("mongodb").ObjectId;

class CommentsController {

    create(req, res) {
        new Comment({
            post_id: String,
            comment: req.body.comment,
            creator: req.user.name,
            create_: new Date(),
            update_: new Date(),
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