const { response } = require('express');
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

//     update(req, res) {
//         query = { authId: req.user.authId };
//         var data = { name: req.body.Fullname, lop: req.body.lop, khoa: req.body.khoa, updated: new Date() };

//         User.findOneAndUpdate(query, { $set: data }, { new: true }, (err, doc) => {
//         if (err) {
//            console.log("Something wrong when updating data!");
//         }
//           console.log(doc);

//   })
//     }



    async list(req, res) {
        let page = parseInt (req.params.page);
        let limit = parseInt (req.params.limit);
        let skip = (page-1)*limit;
        let posts = await Post.find().sort([['created_at',-1]]).skip(skip).limit(limit);
        res.json(posts);
    }
}

module.exports = new PostController