const { validationResult } = require('express-validator/check');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


exports.getAllCommentsOnAPostOfUser = (req, res, next)=>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("retrieving all the comments of the post "+postId+ " of user "+userId);

  let allComments = [];
  Post.findById(postId)
      .populate({
        path: 'comments',
        model: 'Comment',
        select: {
          _id: 1,
          userFullName: 1,
          comment: 1,
          isAnonymous: 1,
          createdAt: 1,
          updatedAt: 1

        }
      }).exec((err, post) => {
        res.status(200).json({
            comments: post.comments
        })
      });


}

exports.getCommentByCommentId = (req, res, next)=>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  var commentId = req.params.commentid;

  console.log("***********************");
  console.log("retrieving comment "+commentId+ " of the post "+postId+ " of user "+userId);
}

exports.createCommentToAPostByUser = (req, res, next)=>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  var commenterId = req.params.commenterUserId;
  // console.log("***********************");
  // console.log("adding comments on the post "+postId+ " of user "+userId);

  // Responding with validation errors incase they occur
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      errors: errors.array()
    });
  }

  User.findById(commenterId, function(err, doc){
    const comment = new Comment({
      userId: doc._id,
      userFullName: doc.fullName,
      comment: req.body.comment,
      isAnonymous: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    comment.save((err, savedComment) =>{
      if(err) return res.status(500).send(err);

      Post.findByIdAndUpdate(
        postId,{
          $push:{
            comments: savedComment._id
          }
        }
      ).catch(err =>{
         return res.status(500).send({
           message: err
         });
      });

      return res.status(200).send(comment);
    // console.log(comment);
  });


  })
  // const comment = new Comment({
  //   userId: userId,

  // })
}

exports.updateCommentToAPostByUser = (req, res, next) => {
  var userId = req.params.userid;
  var postId = req.params.postid;
  var commentId = req.params.commentid;

  console.log("***********************");
  console.log("updating comment "+commentId+ " of the post "+postId+ " by user "+userId);
}

exports.deleteCommentByCommentId = (req, res, next) =>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  var commentId = req.params.commentid;

  console.log("***********************");
  console.log("deleting comment "+commentId+ " of the post "+postId+ " by user "+userId);
}
