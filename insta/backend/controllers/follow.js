exports.getAllFollowersOfAUser = (req, res, next) =>{
  var userId = req.params.userid;
  console.log('Retrieving all the followers of a user '+userId);
}

exports.getAllFollowingsOfAUser = (req, res, next) =>{
  var userId = req.params.userid;
  console.log('Retrieving all the followings of a user '+userId);
}

exports.followAUser = (req, res, next) =>{
  var userId = req.params.userid;
  var followerId = req.params.followerid;

  console.log("I'm user "+followerId+" and I'm following a user "+userId);
}

exports.unfollowAUser = (req, res, next) =>{
  var userId = req.params.userid;
  var unfollowerId = req.params.unfollowerid;

  console.log("I'm user "+unfollowerId+" and I'm unfollowing a user "+userId);
}
