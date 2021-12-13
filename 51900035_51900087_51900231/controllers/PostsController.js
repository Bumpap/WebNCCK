const Post = require('../models/Post');

class PostController {

    create(req, res) {
        new Post({
            content: req.body.content,
            creator: req.body.creator,
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
}

module.exports = new PostController