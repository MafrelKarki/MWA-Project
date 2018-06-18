const {
  validationResult
} = require('express-validator/check');
const Post = require('../models/post');
const User = require('../models/user');


exports.getAllPostsByAUser = (req, res, next) => {
  var userId = req.params.userid;
  // console.log("***********************");
  // console.log("retrieving all the posts of a user "+userId);
  Post.find()
    .where('userId').equals(userId)
    .then(result => {
      res.status(200).json({
        posts: result
      })
    }).catch(err => {
      res.status(204).json({})
    })
}

exports.getOnePostByAUserByPostId = (req, res, next) => {
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("retrieving post " +postId+ " of a user "+userId);

  Post.find()
    .where('userId').equals(userId)
    .where('_id').equals(postId)
    .then(result => {
      res.status(200).json({
        posts: result
      })
    }).catch(err => {
      res.status(204).json({})
    })
}

exports.createPost = (req, res, next) => {
  var userId = req.params.userid;
  // console.log("***********************");
  // console.log("Adding a posts to the user "+userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }

  const post = new Post({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    userId: userId,
    points: 0,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  post.save((err, savedPost) => {
    if (err) return res.status(500).send(err);
    User.findByIdAndUpdate(
      userId, {
        $push: {
          posts: savedPost._id
        }
      }
    ).catch(err => {
      return res.status(500).send({
        message: err
      });
    });

    return res.status(200).send(post);

  })

  console.log(req.body);

}

exports.updatePost = (req, res, next) => {
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("updating post " +postId+ " of a user "+userId);

  Post.findByIdAndUpdate(
    postId,
    req.body, {
      new: true
    },
    (err, updatedPost) => {
      if (err) {
        return res.status(200).send({
          message: "Error Updating Post"
        });
      }
      return res.status(200).send({
        message: "Post has been updated",
        Post: updatedPost
      })
    }
  ).catch(err =>{
    return res.status(500).send({
      message: err
    });
  });
}

exports.deletePost = (req, res, next) => {
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("deleting post " + postId + " of a user " + userId);

  Post.findByIdAndDelete(postId, (err, status)=>{
    if(err){
      return res.status(204).send({
        message: "The requested Post doesn't exist"
      });
    }
    return res.status(200).send({
        message: "The Post has been deleted successfully"
    });
  }).catch(err =>{
    return res.status(500).send({
      message: err
    });
  })

}
