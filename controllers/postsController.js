const Post = require("./../models/postModel");

exports.createPost = (req, res, next) => {
  const newPost = new Post({
    userId: req.user.id,
    text: req.body.text,
  });

  newPost.save().then((post) => res.json(post));
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .populate("userId")
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404));
};
