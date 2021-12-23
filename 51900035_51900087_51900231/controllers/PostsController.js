const Post = require('../models/Post');
const { post } = require('../routes/posts');

class PostController {

    create(req, res) {
        new Post({
            content: req.body.content,
            creator: req.user.name,
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
        let posts = await Post.find().sort([[]]);
        res.json(posts);
    }
}

module.exports = new PostController