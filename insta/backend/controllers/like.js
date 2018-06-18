const queryString = require('querystring');

exports.getAllLikesOfPost = (req,res, next) =>{
  var userId = req.params.userid;
  var postId = req.params.postid;
  console.log("***********************");
  console.log("The total like for the post "+postId+" of user "+userId+" is {somevalue}");
}

exports.likeAPost = (req, res, next)=>{
  var whoLiked = req.params.liker_id;// add this (whoLiked) to userId's post's postId's like array
  var userId = req.params.userid;
  var postId = req.params.postid;
  console.log("***********************");
  console.log("user "+whoLiked +" liked the post " +postId+ " of a user "+userId);
}

exports.unLikeAPost = (req, res, next)=>{
  var whoUnliked = req.params.unliker_id;// remove this (whoUnliked) from userId's post's postId's like array
  var userId = req.params.userid;
  var postId = req.params.postid;
  console.log("***********************");
  console.log("user "+whoUnliked +" unliked the post " +postId+ " of a user "+userId);
}
