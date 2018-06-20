/*
* @Author: Mafrel
*
*/
const queryString = require('querystring');
const Post = require('../models/post');
const User = require('../models/user');


exports.getAllLikesOfPost = (req,res, next) =>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("The total like for the post "+postId+" of user "+userId+" is {somevalue}");

  Post.findById(postId)
  .populate({
    path: 'likes',
    model: 'User',
    select: {
      _id: 1,
      name: 1,
      email: 1,
      dob: 1,
      profilePicUrl: 1,
      createdAt: 1,
      updatedAt: 1

    }
  }).exec((err, user) => {
    res.status(200).send({
        Liked_By: user.likes
    })
  });
}

exports.likeOrUnlikeAPost = (req, res, next)=>{
  var whoLiked = req.params.liker_id;// add this (whoLiked) to userId's post's postId's like array
  var userId = req.params.userid;
  var postId = req.params.postid;
  // console.log("***********************");
  // console.log("user "+whoLiked +" liked the post " +postId+ " of a user "+userId);

  // weirdCar.update({$inc: {wheels:1}}, { w: 1 }, callback);

  Post.findById(postId, (err, doc) => {
    doc.like(whoLiked).then(() => {
      return res.status(200).send({message: 'The post has been liked'});
    }).catch((err) => {
      return res.status(400).send({message: err});
    });
  })

}
